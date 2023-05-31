const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI;

const connect = async () => {
    console.log('Connecting with database...');
    try {
        if(!DB_URI) {
            throw new Error('No database found!');
        }

        const x = await mongoose.connect(DB_URI);
        const databaseName = x.connections[0].name;
        console.log(`Database coneccted at: ${databaseName}`);
    } catch (error) {
        console.log('Fail to connect in to the database:', error);
        process.exit();        
    }
};

connect();
