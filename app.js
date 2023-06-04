require('dotenv/config');
const express = require('express');
const app = express();

//DataBase
require('./db');

//Configs
require('./configs')(app);

//Routes
//app.use('/products', require('./routes/product.routes'));
const productRoutes = require('./routes/product.routes');
app.use('/products', productRoutes);

//Erros
app.use((req, res, next) => {
    res.status(404).json('Not Found!');
});

require('./error-handling')(app);

module.exports = app;