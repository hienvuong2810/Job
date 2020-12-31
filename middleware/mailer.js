const config = require("config");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const transporter = nodemailer.createTransport(config.mailer.transport);

const mailOptions = {
    from: "talenthub-worldwide@hotmail.com", // sender address
    to: "", // list of receivers
    subject: "", // Subject line
    html: "" // html body
};

const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

module.exports = {
    send: (to, subject, html) => {
        const options = {
            ...mailOptions,
            to,
            html,
            subject
        };

        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            }

            return true;
        });
    },
    sendVerifyTemplate: (to, code) => {
        readHTMLFile(
            global.rootPath + "/html_templates/account_verify.html",
            (err, html) => {
                const template = handlebars.compile(html);
                const replacements = { code };
                const htmlToSend = template(replacements);
                const options = {
                    ...mailOptions,
                    to,
                    subject: "Verify your talenthub account.",
                    html: htmlToSend
                };

                transporter.sendMail(options, (error, response) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        );
    }
};
