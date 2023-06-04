const router = require("express").Router();

// modelo
const Product = require("../models/Product.model");

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

module.exports = router;
