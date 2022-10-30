const Mongoose = require('mongoose');
require('./models/user');

Mongoose.connect('mongodb://localhost/trainingsessions', 
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