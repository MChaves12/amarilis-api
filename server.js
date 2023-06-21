require('dotenv/config');

const connectDb = require('./db');
const app = require('./app');

//PORT CONFIG

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
});
