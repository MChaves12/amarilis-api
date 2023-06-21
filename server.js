const app = require('./app');

//PORT CONFIG

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));

