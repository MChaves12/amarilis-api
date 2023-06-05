const router = require('express').Router();

const { authenticated } = require('../middlewares/jwt.middleware');

const User = require('../models/user.model');

router.get('/', async (req, res, next) => {
    try {
        const findUser = await User.find();
        res.status(200).json(findUser);
    } catch (error) {
        next(error);
    }
});