const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { authenticated } = require('../middlewares/jwt.middleware');

const User = require('../models/user.model');

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

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if(!username || !password) {
            res.status(400).json({message: 'Fill in the required fields'});
            return;
        }

        const foundUser = await User.findOne({ username });
        if(!foundUser) {
            res.status(400).json({message: 'Wrong username or password'});
            return;
        }

        const verify = bcrypt.compareSync(password, foundUser.password);
        if(!verify) {
            res.status(400).json({message: 'Wrong username or password'});
            return;
        }

        const payload = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '9h'});

        res.status(200).json({ authToken: token });

    } catch (error) {
        next(error);
    }
});


router.get('/verify', authenticated, (req, res) => {
    res.json(req.payload);
})

module.exports = router;
