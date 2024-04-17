const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://groupe11:TA53dC6F7tPT2HTl@cluster0.vgonvqy.mongodb.net/')
    .then(() => console.log('Database connected successfully !'))
    .catch((error) => console.log("error : " + error.message));