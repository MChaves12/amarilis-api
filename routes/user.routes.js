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

router.put('/:userId', authenticated, async (req, res, next) => {
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

router.post('/add-category/:categoryId', async (req, res, next) => {
    const { categoryId } = req.params;
    const userId = req.payload._id;
    try {
        const findUser = await User.findByIdAndUpdate(userId, {$push: {categories: categoryId}}, {new: true});
        const { _id, username, categories } = findUser;
        res.status(200).json({_id, username, categories});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
