import nodemailer from "nodemailer";
const sendGridMailer = require('nodemailer-sendgrid-transport');

const sendGridKey = process.env.SENDGRID_API_KEY || '';
const from = process.env.email || '';

const transporter = nodemailer.createTransport(sendGridMailer({
  auth: {
    api_key: sendGridKey
  }
}));

const sendMailServices = (to: any , subject: any, html: any) => {
   return transporter.sendMail({
    to:to,
    from: from,
    subject: subject,
    html:html
  })
};

export default sendMailServices;
