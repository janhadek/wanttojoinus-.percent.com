const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
 const output = `
    <p>First Name: ${req.body.firstname}</p>
    <p>Second Name: ${req.body.secondname}</p>
    <p>Reason: ${req.body.reason}</p>
 `;

 async function main() {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'janhadek7@gmail.com',
        pass: 'letadlo222',
      },
    });

    let info = await transporter.sendMail({
      from: '"Replit User" <your-email@gmail.com>',
      to: 'janhadek7@gmail.com',
      subject: 'New Signup',
      html: output,
    });

    console.log('Message sent: %s', info.messageId);
 }

 main().catch(console.error);

 res.send('Thank you for your submission! We will review your information and get back to you soon.');
});

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});