const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../models/User.model');

router.get('/', (req, res, next) => {
    res.json('All good!')
});

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        if(!username || !email || !password) {
            res.status(400).json({message: 'Fill in the required fields'});
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!emailRegex.test(email)) {
            res.status(400).json({message: 'Insert a valid email'});
            return;
        }

        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!passwordRegex.test(password)) {
            res.status(400).json({message: 'The password must have 6 caracters and at least 1 lowercase letter, 1 uppercase letter and 1 number'});
            return;
        }

        const userEmail = await User.findOne({ email });
        if(userEmail) {
            res.status(400).json({message: 'Email already registerd. Insert a new one'});
            return;
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        
        const userFromDB = await User.create({ username, email, password: passwordHash });
        res.status(201).json({message: `User created`});

    } catch (error) {
        next(error);
    }
});

module.exports = router;
