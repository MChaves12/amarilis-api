const router = require('express').Router();
const { authenticated } = require('../middlewares/jwt.middleware');
const User = require('../models/User.model');
const Category = require('../models/Category.model');

//Publicas
router.get('/', async (req, res, next) => {
    try {
        const findCategory = await Category.find();
        res.status(200).json(findCategory);
    } catch (error) {
        next(error);
    }
});

router.get('/name/:categoryName', async (req, res, next) => {
    console.log("Aqui");
    const { categoryName } = req.params;
    try {
        const findCategory = await Category.findOne({name: categoryName}).populate('products');
        res.status(200).json(findCategory);
    } catch (error) {
        next(error);
    }
});

//Middleware
router.use(authenticated);

//Privadas
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





router.get('/:categoryId', async (req, res, next) => {
    const { categoryId } = req.params;
    try {
        const findCategory = await Category.findById(categoryId);
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

router.delete('/:categoryId', authenticated, async (req, res, next) => {
    const { categoryId } = req.params;
    const { _id } = req.payload;
    try {
        await Category.findByIdAndDelete(categoryId);
        const user = await User.findById(_id);
        user.categories.splice(categoryId);
        user.save();
        res.status(204).json()
    } catch (error) {
        next(error);
    }
});

router.post('/add-product/:categoryName/:productId', async (req, res, next) => {
    const { categoryName, productId } = req.params;
    try {
        if(!categoryName){
            res.status(400).json({message: 'Category not found. Create a Category to add products'})
        }
        const findCategory = await Category.findOneAndUpdate({name: categoryName}, {$push:{products: productId}}, {new:true});
        const { name, products } = findCategory;
        res.status(200).json({name, products});
    } catch (error) {
        next(error);
    }
});


module.exports = router;
