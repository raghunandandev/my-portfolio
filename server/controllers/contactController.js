const nodemailer = require('nodemailer');

// @desc    Send email to admin
// @route   POST /api/contact
// @access  Public
const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // 1. Create Transporter (Connection to Email Provider)
        // const transporter = nodemailer.createTransport({
        //     service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
        //     auth: {
        //         user: process.env.EMAIL_USER, // Your email
        //         pass: process.env.EMAIL_PASS, // Your App Password (Not your login password)
        //     },
        // });

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Explicit host
            port: 465,              // Explicit port (SSL)
            secure: true,           // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // Make sure this variable matches Render
            }
        });

        // 2. Define Email Options
        const mailOptions = {
            from: `"${name}" <${email}>`, // Sender address
            to: process.env.EMAIL_USER,   // Receiver (You)
            subject: `Portfolio Contact: Message from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        // 3. Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
};

module.exports = { sendEmail };