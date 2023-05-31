require('dotenv/config');
const express = require('express');
const app = express();

//DataBase


//Configs

//Routes

//Erros
app.use((req, res, next) => {
    res.status(404).json('Not Found!');
});

require('./error-handling')(app);

module.exports = app;