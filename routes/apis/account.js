const router = require("express").Router();
const config = require("config");
const fetch = require("node-fetch");
const mailer = require("../../middleware/mailer.js");
const { getClientToken } = require("./auth.js");

router.post("/candidate", async (req, res) => {
	if (!req.body) 
		return res.status(400).send("Please include candidate data.");

	let token = await getClientToken();

	if (!token.ok) {
		return res.status(500).send("Could not obtain access token.");
	}

	token = (await token.json()).access_token;
	
	let response = await fetch(config.backend.url + "/api/account/candidate", {
		method: "POST",
		mode: "cors",
		headers: {
			"Authorization" : "Bearer " + token,
			"Content-Type" : "application/json",
			"Accept" : "application/json",
		},
		body: JSON.stringify(req.body)
	});

	if (response.ok) {
		response = await response.json();

		mailer.sendVerifyTemplate(response.email, response.activeCode);

		return res.status(200).send(response);
	}

	return res.status(response.status).send();
});

router.post("/recruiter", async (req, res) => {
	if (!req.body) 
		return res.status(400).send("Please include candidate data.");

	let token = await getClientToken();

	if (!token.ok) {
		return res.status(500).send("Could not obtain access token.");
	}

	token = (await token.json()).access_token;
	
	let response = await fetch(config.backend.url + "/api/account/recruiter", {
		method: "POST",
		mode: "cors",
		headers: {
			"Authorization" : "Bearer " + token,
			"Content-Type" : "application/json",
			"Accept" : "application/json",
		},
		body: JSON.stringify(req.body)
	});

	if (response.ok) {
		response = await response.json();

		mailer.sendVerifyTemplate(response.email, response.activeCode);

		return res.status(200).send(response);
	}

	return res.status(response.status).send();
});

router.put("/verify", async (req, res) => {
	const { code, id } = req.query;

	if (!code || !id)
		return res.status(400).send("Verification code or username not found.");

	let token = await getClientToken();

	if (!token.ok) {
		return res.status(500).send("Could not obtain access token.");
	}

	token = (await token.json()).access_token;

	let response = await fetch(config.backend.url + "/api/account/verify?code=" + code + "&id=" + id, {
		method: "PUT",
		mode: "cors",
		headers: {
			"Authorization" : "Bearer " + token
		}
	});

	return res.status(response.status).send(await response.text());
});

module.exports = router;