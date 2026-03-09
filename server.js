const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "YOUR_APP_PASSWORD"
  }
});

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "YOUR_GMAIL@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully ✅");
  } catch (error) {
    res.status(500).send("Error sending message ❌");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
