const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f91e63a309ce1f",
      pass: "43836a7e0f4451"
    }
});
