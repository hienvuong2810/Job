const router = require("express").Router();
const auth = require("../../middleware/auth.js");
const getAccessToken = require("./auth.js").getAccessToken;
const request = require("request");
// MIME-types that currently accepted by this router
const MIMES = [
    "*/*",
    "image/gif",
    "image/jpeg",
    "application/json",
    "text/plain",
    "text/plain; charset=UTF-8",
    "text/html"
];

send = (res, body) => {
    res.status(200).send(body);
};

render = (res, body) => {
    res.status(200).render(body);
};

const respondMethods = {
    "*/*": send,
    "application/json": send,
    "text/plain": send,
    "text/plain; charset=UTF-8": send,
    "text/html": render
};

router.all("/", auth, async (req, res) => {
    const token = await getAccessToken(req.user.username);

    let url = req.query["url"];
    console.log(url);
    if (!token) {
        return res.status(401).send("Session expired");
    }

    if (!url) {
        return res.status(400).send("Request must contain destination uri");
    }

    if (MIMES.indexOf(req.header("Accept")) === -1) {
        return res.status(415).send("Media type not supported");
    }
    
	let headers = {
		...req.headers,
		"Authorization": "Bearer " + token
	}

    request(
        {
            method: req.method,
            headers,
            url,
            body:
                req.method.toUpperCase() !== "GET"
                    ? JSON.stringify(req.body)
                    : null
        },
        (error, response, body) => {
            if (response && response.statusCode === 200) {
                return respondMethods[req.header("Accept")](res, body);
            }
            if (!response) {
                return res.status(500).send(error);
            }

            return res.status(response.statusCode).send(error);
        }
    );
});

module.exports = router;
