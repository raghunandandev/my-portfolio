const { Resend } = require('resend');

// Initialize Resend with your API Key
// Make sure to add RESEND_API_KEY to your .env file on Render
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const data = await resend.emails.send({
            // ⚠️ IMPORTANT: You must use this 'onboarding' email for the free tier
            // (Unless you verify your own domain on Resend dashboard)
            from: 'Portfolio Contact <onboarding@resend.dev>',

            // Send it to YOUR personal email
            to: ['raghunandandevsingh@gmail.com'],

            subject: `New Message from ${name}`,

            // This ensures when you click "Reply" in Gmail, it goes to the visitor
            reply_to: email,

            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                    ${message}
                </blockquote>
            `
        });

        res.status(200).json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error("Resend Error:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
};

module.exports = { sendEmail };



// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

// // @desc    Send email to admin (using OAuth2 to bypass port blocks)
// // @route   POST /api/contact
// // @access  Public
// const sendEmail = async (req, res) => {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//         return res.status(400).json({ message: 'Please fill all fields' });
//     }

//     try {
//         // 1. Setup OAuth2 Client
//         const oauth2Client = new OAuth2(
//             process.env.EMAIL_CLIENT_ID,
//             process.env.EMAIL_CLIENT_SECRET,
//             "https://developers.google.com/oauthplayground"
//         );

//         oauth2Client.setCredentials({
//             refresh_token: process.env.EMAIL_REFRESH_TOKEN
//         });

//         // 2. Get Access Token (Automatically handles refreshing)
//         const accessToken = await new Promise((resolve, reject) => {
//             oauth2Client.getAccessToken((err, token) => {
//                 if (err) {
//                     console.error("OAuth Access Token Error:", err);
//                     reject("Failed to create access token");
//                 }
//                 resolve(token);
//             });
//         });

//         // 3. Create Transporter
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: process.env.EMAIL_USER,
//                 clientId: process.env.EMAIL_CLIENT_ID,
//                 clientSecret: process.env.EMAIL_CLIENT_SECRET,
//                 refreshToken: process.env.EMAIL_REFRESH_TOKEN,
//                 accessToken: accessToken
//             }
//         });

//         // 4. Define Email Options
//         const mailOptions = {
//             from: `"${name}" <${process.env.EMAIL_USER}>`, // Must be authenticated user
//             to: process.env.EMAIL_USER,
//             replyTo: email, // This allows you to reply directly to the sender
//             subject: `Portfolio Contact: Message from ${name}`,
//             html: `
//                 <h3>New Contact Message</h3>
//                 <p><strong>Name:</strong> ${name}</p>
//                 <p><strong>Reply To:</strong> ${email}</p>
//                 <hr />
//                 <p>${message}</p>
//             `,
//         };

//         // 5. Send Email
//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Email sent successfully!' });

//     } catch (error) {
//         console.error('Email Error:', error);
//         res.status(500).json({ message: 'Failed to send email. Please try again later.' });
//     }
// };

// module.exports = { sendEmail };

// const nodemailer = require('nodemailer');

// // @desc    Send email to admin
// // @route   POST /api/contact
// // @access  Public
// const sendEmail = async (req, res) => {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//         return res.status(400).json({ message: 'Please fill all fields' });
//     }

//     try {
//         // 1. Create Transporter (Connection to Email Provider)
//         // const transporter = nodemailer.createTransport({
//         //     service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
//         //     auth: {
//         //         user: process.env.EMAIL_USER, // Your email
//         //         pass: process.env.EMAIL_PASS, // Your App Password (Not your login password)
//         //     },
//         // });

//         // const transporter = nodemailer.createTransport({
//         //     host: 'smtp.gmail.com', // Explicit host
//         //     port: 465,              // Explicit port (SSL)
//         //     secure: true,           // true for 465, false for other ports
//         //     auth: {
//         //         user: process.env.EMAIL_USER,
//         //         pass: process.env.EMAIL_PASS // Make sure this variable matches Render
//         //     }
//         // });

//         const transporter = nodemailer.createTransport({
//             service: 'gmail', // You can keep this, but explicit host is better
//             host: 'smtp.gmail.com',
//             port: 587,                 // 👈 CHANGE FROM 465 TO 587
//             secure: false,             // 👈 CHANGE FROM true TO false (true is only for 465)
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             },
//             tls: {
//                 ciphers: "SSLv3",      // Helpful for some cloud networks
//                 rejectUnauthorized: false // (Optional) Helps avoid certificate errors in dev
//             },
//             family: 4               // Use IPv4, skip IPv6 - helps on some networks
//         });

//         // 2. Define Email Options
//         const mailOptions = {
//             from: `"${name}" <${email}>`, // Sender address
//             to: process.env.EMAIL_USER,   // Receiver (You)
//             subject: `Portfolio Contact: Message from ${name}`,
//             text: `
//         Name: ${name}
//         Email: ${email}
        
//         Message:
//         ${message}
//       `,
//             html: `
//         <h3>New Contact Message</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//         };

//         // 3. Send Email
//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Email sent successfully!' });
//     } catch (error) {
//         console.error('Email Error:', error);
//         res.status(500).json({ message: 'Failed to send email. Please try again later.' });
//     }
// };

// module.exports = { sendEmail };