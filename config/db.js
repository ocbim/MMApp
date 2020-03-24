'use stric'
const mongoose = require('mongoose');
const config = require('./config');



mongoose.connect(config.urlDB, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(()=>{
        console.log('La coneccion con la DB a sido satisfactoria.');
        
    })
    .catch((err)=>{
        console.log(`Error en la coneccion con la DB error: ${err}`);
        
    });

module.exports = mongoose;