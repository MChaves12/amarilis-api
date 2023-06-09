const express = require('express');
const app = express();

//Configs
require('./configs')(app);

//Middlewares
const { authenticated } = require('./middlewares/jwt.middleware');

//Routes
app.use('/auth', require('./routes/auth.routes'));

app.use('/products', require('./routes/product.routes'));
app.use('/category', require('./routes/category.routes'));
app.use(authenticated);
app.use('/user', require('./routes/user.routes'));

//Erros
app.use((req, res, next) => {
    res.status(404).json('Not Found!');

});

require('./error-handling')(app);

module.exports = app;
