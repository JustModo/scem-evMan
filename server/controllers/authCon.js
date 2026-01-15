const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { SignJWT } = require('jose');

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordsMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const token = await new SignJWT({ userId: user._id.toString(), role: user.role, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret);

        res.json({
            success: true,
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const handleRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            passwordHash,
            role: 'user',
            registeredContests: []
        });

        await newUser.save();

        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const token = await new SignJWT({ userId: newUser._id.toString(), role: newUser.role, email: newUser.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    handleLogin,
    handleRegister
}