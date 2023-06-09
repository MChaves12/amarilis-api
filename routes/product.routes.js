const router = require("express").Router();

// modelo
const Product = require("../models/product.model");
const Category = require("../models/Category.model");
const uploadImage = require("../configs/cloudinary.configs");

// middlewares
//const { isAdmin } = require('../middlewares/role.middleware');

//rotas
//rotas de autenticação - Teste funcionando
//router.get('/teste', (req, res) => {
//  res.json('Tudo certo aqui!'); // rota de teste
//});

// Crud -> Create
router.post("/", async (req, res, next) => {
  const { name, price, description, size, image } = req.body;
  try {
    const newProductFromDB = await Product.create({
      name,
      price,
      description,
      size,
      image,
    });
    res.status(200).json(newProductFromDB);
  } catch (error) {
    next(error);
  }
});

//cRud -> Read
router.get("/", async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const productsFromDB = await Product.find()
      .limit(limit)
      .skip(limit * (page - 1));
    res.status(200).json(productsFromDB);
  } catch (error) {
    next(error);
  }
});

router.get("/:productName", async (req, res, next) => {
  const { productName } = req.params;
  try {
    const findProduct = await Product.findOne({ name: productName });
    res.status(200).json(findProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  console.log(req.params);
  try {
    const productFromDB = await Product.findById(productId);
    res.status(200).json(productFromDB);
  } catch (error) {
    next(error);
  }
});

// crUd -> Update
router.put("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const productFromDB = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    res.status(200).json(productFromDB);
  } catch (error) {
    next(error);
  }
});

// cruD -> Delete;
router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name } = req.body;
  try {
    await Product.findByIdAndRemove(productId);
    const category = await Category.findOne(name);
    category.products.splice(productId);
    category.save();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

router.post(
  "/image",
  authenticated,
  uploadImage.array("image"),
  async (req, res, next) => {
    try {
      const urls = req.files.map((file) => file.path);
      res.status(201).json({ urls });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
