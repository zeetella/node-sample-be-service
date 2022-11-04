const Mongoose = require('mongoose');
require('./models/user');
const CONFIGS = require("../configs/configs");

Mongoose.connect(CONFIGS.MONGO.URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    (err) => {
        if (err) {
            console.error("Please check the mongodb Service " + err);
        } else {
            console.log('\x1b[32m%s\x1b[1m', 'Mongodb connection successful!');
        }
    });

//module.exports = Mongoose;