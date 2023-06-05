const router = require('express').Router();

const { authenticated } = require('../middlewares/jwt.middleware');

const User = require('../models/User.model');

router.get('/', async (req, res, next) => {
    try {
        const findUser = await User.find();
        res.status(200).json(findUser);
    } catch (error) {
        next(error);
    }
});

router.put('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { username, email } = req.body
    try {
        const findUser = await User.findByIdAndUpdate(userId, {username, email}, {new: true});
        res.status(200).json(findUser);
    } catch (error) {
        next(error);
    }
});

router.delete('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
       await User.findByIdAndDelete(userId);
       res.status(204).json() 
    } catch (error) {
        next(error);
    }
});

module.exports = router;
