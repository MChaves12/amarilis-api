require('dotenv/config');
const express = require('express');
const app = express();

//DataBase
require('./db');

//Configs
require('./configs')(app);

//Routes
app.use('/auth', require('./routes/auth.routes'));

//Erros
app.use((req, res, next) => {
    res.status(404).json('Not Found!');
});

require('./error-handling')(app);

module.exports = app;
