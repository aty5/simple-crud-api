const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPw });

    res.status(201).json({ message: 'User created!', userId: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
