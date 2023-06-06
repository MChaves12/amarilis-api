const router = require('express').Router();
const { authenticated } = require('../middlewares/jwt.middleware');
const Product = require('../models/product.model');
const Category = require('../models/Category.model');


router.post("/", async (req, res, next) => {
    const { name, products } = req.body;
    try {
      const newCategory = await Category.create({
        name,
        products
      });
      res.status(200).json(newCategory);
    } catch (error) {
      next(error);
    }
  });

router.get('/', async (req, res, next) => {
    try {
        const findCategory = await Category.find();
        res.status(200).json(findCategory);
    } catch (error) {
        next(error);
    }
});

router.get('/:categoryName', async (req, res, next) => {
    const { categoryName } = req.params;
    try {
        const findCategory = await Category.findOne({name: categoryName});
        res.status(200).json(findCategory);
    } catch (error) {
        next(error);
    }
});

router.put('/:categoryId', async (req, res, next) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
        const findCategory = await Category.findByIdAndUpdate(categoryId, {name}, {new: true});
        res.status(200).json(findCategory);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
