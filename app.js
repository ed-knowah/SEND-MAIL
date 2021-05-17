const express = require("express");
const app = express();
var port = process.env.PORT || 3000;
require("dotenv").config();

const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(bodyParser.json());

app.get("/sendmail", (req, res) => {

  async function sendMail() {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
      });

      let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: process.env.MAIL_USERNAME,
        subject: "ProjectChecker - Website Is up",
        text: "The website returned with a good status code",
      };

      const result = transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  sendMail()
    .then((result) => console.log("email sent...", result))
    .catch((error) => console.log(error.message));
  res.status(200).send("succesfully sent mail");
 
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
