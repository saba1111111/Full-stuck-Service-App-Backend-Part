const nodemailer = require('nodemailer');


const sendingEmails = (email,subject,html) => {
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sabapachulia1234@gmail.com',
    pass: 'skchotkphxahemle'
  }
});

let mailOptions = {
  from: 'sabapachulia1234@gmail.com',
  to: email,
  subject: subject,
  html: html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = sendingEmails;