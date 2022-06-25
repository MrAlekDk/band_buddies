import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function sendMail(email, subject, text){
    let message = {
        from: 'BandBuddiesDk <bandBuddiesDk@gmail.com>',
        to: email,
        subject: subject,
        text: text,
        html: null
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

export default{
    transporter: transporter,
    sendNewEmail: sendMail
}