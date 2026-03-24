const nodemailer = require("nodemailer");
const config = require("../config");

//nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

//send feedback to mail
const sendmail = (feedback) => {
  const mailOptions = {
    from: config.email.user,
    to: config.email.admin,

    subject: `New feedback: ${feedback.subject}`,
    html: `
     <h2>New Feedback Received</h2>
     <p><strong>Name: ${feedback.name}</strong></p>
     <p><strong>Email: ${feedback.email}</strong></p>
     <p><strong>Subject: ${feedback.subject}</strong></p>
     <p><strong>Rating: ${feedback.rating}</strong></p>
     <p><strong>Message: ${feedback.message}</strong></p>
     `,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendmail;
