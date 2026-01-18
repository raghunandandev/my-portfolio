const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in .env file");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log(`Attempting login for: ${username}`); // Debug Log

        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found'); // Debug Log
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (isMatch) {
            console.log('Password matched, generating token...'); // Debug Log
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            console.log('Invalid password'); // Debug Log
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('LOGIN ERROR:', error.message); // This will show in your terminal
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginUser };

// const User = require('../models/User.js');
// const jwt = require('jsonwebtoken');

// const generateToken = (user) => {
//     return jwt.sign({id} , process.env.JWT_SECRET, {
//         expiresIn: '30d',
//     });
// }

// const loginUser = async (req, res) => {
//     const {username, password} = req.body;

//     const user = await User.findOne({username});

//     if(user && (await user.matchPassword(password))){
//         res.json({
//             _id: user._id,
//             username: user.username,
//             token: generateToken(user._id),
//         });
//     }else{
//         res.status(401).json({ message: 'Invalid username or password' });
//     }
// }

// module.exports = {loginUser};