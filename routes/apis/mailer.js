const router = require("express").Router();
const mailer = require("../../middleware/mailer.js");

// @route GET api/auth
// @desc Send an email
// @access private

router.get("/", (req, res) => {
	mailer.sendTemplate("ou@gmail.com", "Verify your account");

    return res.status(200).send();
});

module.exports = router