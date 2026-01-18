const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

// Connect to DB
connectDB();

const importData = async () => {
    try {
        // 1. Clear existing users to avoid duplicates
        await User.deleteMany();

        // 2. Create the admin user
        // The password will be automatically hashed by your User model's 'pre-save' middleware
        const adminUser = new User({
            username: 'admin',
            password: 'password123' // CHANGE THIS TO YOUR DESIRED STRONG PASSWORD
        });

        await adminUser.save();

        console.log('✅ Admin User Created Successfully!');
        console.log('Username: admin');
        console.log('Password: password123'); // Remember to delete this log in production
        process.exit();

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

importData();