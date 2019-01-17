"use strict";
const nodemailer = require("nodemailer");

module.exports.send = async function (req, res) {

    if (req.body.email == undefined || req.body.email == "") {
        res.status(401).json({
            "message": "No data found!"
        });
    }

    var email = req.body.email;
    var message = req.body.message;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "realasasa@gmail.com",
            pass: "warka123"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: email, // sender address
        to: "mzmarwat@gmail.com, realasasa@gmail.com", // list of receivers
        subject: "Request for Property Info", // Subject line
        text: "", // plain text body
        html: message // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    res.status(200);
    res.json({
        "message": "success"
    });
}