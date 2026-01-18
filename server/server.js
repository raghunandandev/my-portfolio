const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

//const dotenv = require('dotenv');
const cors = require('cors');

const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db.js')

//dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000", // Keep this for local development
        "https://devraghunandan.vercel.app/" // Future deployed URL
    ],
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/projects', require('./routes/projectRoutes.js'));
//app.use('/api/blogs', require('./routes/blogRoutes.js'));
app.use('/api/misc', require('./routes/miscRoutes.js'));
// app.use('/api/profiles', require('./routes/profileRoutes'));
// app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/zone', require('./routes/zoneRoutes'));

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

