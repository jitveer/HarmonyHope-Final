const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'cassandra88@ethereal.email',
        pass: 'pevK5yhg4xDvVRDPeT'
    }
});

module.exports = transporter;