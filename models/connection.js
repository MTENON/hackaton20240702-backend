const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING; //Ici notre connection string pour mongoose est déterminée et sécurisée

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error));