const router = require("express").Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const request = require("request");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");
const auth = require("../../middleware/auth.js");
const FormData = require("form-data");

// @route POST api/auth
// @desc Authorize a user
// @access Public

router.post("/", async (req, res) => {
    const body = req.body;

    if (!body || !body.username || !body.password) {
        return res.status(400).send("Please enter your credentials.");
    }

    const username = body.username;
    const password = body.password;

    delete body.password;

    let fetchRes = await oAuthAuthorize(username, password);

    if (!fetchRes) {
        return res.status(500).send("Server error");
    }

    let status = fetchRes.status;

    if (status === 200) {
        const oauth_token = await fetchRes.json();
        let session_token = await generateSessionToken(
            username,
            oauth_token.refresh_token,
            0
        );

        if (session_token === null) {
            return res.status(500).send("Server error");
        }

        let user = await User.findOne({ username });

        if (!user) {
            user = new User();
            user.username = username;
        }

        user.session_token = formatOAuthToken({
            ...oauth_token,
            _v: 0
        });

        if (!user.session_token) {
            return res.status(500).send("Cannot generate access token");
        }

        user.save().then(user =>
            res.status(200).json({ token: session_token, username })
        );
    } else {
        return res.status(status).send(await fetchRes.json());
    }
});

// @route PUT api/auth
// @desc Authorize a user with session_token
// @access Public

router.put("/", auth, async (req, res) => {
    let authentication = req.user;
    let username = authentication.username;
    let session = authentication.session;
    let user = await User.findOne({ username: username });

    if (!user) {
        return res.status(400).send("User not found.");
    }

    let rawSessionToken =
        username +
        "-" +
        user.session_token.refresh_token +
        "-" +
        user.session_token._v;

    bcrypt.compare(rawSessionToken, session).then(async isMatch => {
        if (!isMatch) {
            return res.status(400).send("Invalid token");
        }

        let now = new Date();

        if (now.getTime() < user.session_token.valid_till) {
            return res.status(200).json({ token: req.token, username });
        }

        let fetchRes = await oAuthRefreshAccessToken(
            user.session_token.refresh_token
        );

        if (!fetchRes) return res.status(500).send("Server error");

        let status = fetchRes.status;

        if (status === 200) {
            const oauth_token = await fetchRes.json();

            user.session_token = formatOAuthToken({
                ...oauth_token,
                _v: ++user.session_token._v
            });

            if (!user.session_token) {

                return res.status(500).send("Cannot generate access token. ");

            }

            let newSessionToken = await generateSessionToken(
                user.username,
                user.session_token.refresh_token,
                user.session_token._v
            );

            if (!newSessionToken) {
                return res.status(500).send("Cannot generate access token. ");
            }

            user.save().then(user =>
                res.status(200).json({ token: newSessionToken, username })
            );
        } else {
            return res.status(status).send(await fetchRes.json());
        }
    });
});

module.exports = { router, getAccessToken, getClientToken };

generateSessionToken = async (username, refresh_token, version) => {
    if (!username || !refresh_token || typeof version !== "number") {
        return null;
    }

    let rawSessionToken = username + "-" + refresh_token + "-" + version;

    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(rawSessionToken, salt);
        let token = await jwt.sign(
            {
                username: username,
                session: hash
            },
            config.get("jwtSecret")
        );

        return token;
    } catch (err) {
        return null;
    }
};

oAuthAuthorize = (username, password) => {
    let backend = config.backend;
    let credentials = Buffer.from(
        backend.clientId + ":" + backend.secret
    ).toString("base64");
    let form = new FormData();

    form.append("grant_type", "password");
    form.append("username", username);
    form.append("password", password);

    return fetch(backend.url + "/oauth/token", {
        mode: "cors",
        method: "POST",
        headers: {
            Authorization: "Basic " + credentials,
            Accept: "application/json"
        },
        body: form
    }).then(
        res => res,
        err => null
    );
};

oAuthRefreshAccessToken = refresh_token => {
    let backend = config.backend;
    let credentials = Buffer.from(
        backend.clientId + ":" + backend.secret
    ).toString("base64");
    let form = new FormData();

    form.append("grant_type", "refresh_token");
    form.append("refresh_token", refresh_token);

    return fetch(backend.url + "/oauth/token", {
        mode: "cors",
        method: "POST",
        headers: {
            Authorization: "Basic " + credentials,
            Accept: "application/json"
        },
        body: form
    }).then(
        res => res,
        err => null
    );
};

formatOAuthToken = OAuthToken => {
    if (typeof OAuthToken !== "object") {
        return null;
    }

    let basicOAuthTokenFields = ["access_token", "expires_in", "refresh_token"];

    for (let f of basicOAuthTokenFields) {
        if (!OAuthToken[f]) {
            return null;
        }
    }

    let expires_in = OAuthToken.expires_in;

    if (typeof expires_in !== "number") {
        if (!isNaN(expires_in)) {
            OAuthToken.expires_in = +expires_in;
        } else {
            return null;
        }
    }

    let date = new Date();

    OAuthToken.valid_till = date.getTime() + OAuthToken.expires_in * 1000;

    return OAuthToken;
};

async function getAccessToken(username) {
    const user = await User.findOne({ username });

    return !user
        ? null
        : user.session_token
        ? user.session_token.access_token
        : null;
}

async function getClientToken() {
    let backend = config.backend;
    let credentials = Buffer.from(
        backend.clientId + ":" + backend.secret
    ).toString("base64");
    let form = new FormData();

    form.append("grant_type", "client_credentials");

    return fetch(backend.url + "/oauth/token", {
        mode: "cors",
        method: "POST",
        headers: {
            Authorization: "Basic " + credentials,
            Accept: "application/json"
        },
        body: form
    }).then(res => res, err => null);
}
