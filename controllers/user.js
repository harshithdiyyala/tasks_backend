const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const newUser = new User({
            username,
            passwordHash: hashedPassword,
            userId: uuid.v4()
        });

        await newUser.save();
        res.status(201).send({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user.' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).send({ message: 'Authentication failed.' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: 86400 }); // 24 hours
    res.status(200).send({ token });
};
