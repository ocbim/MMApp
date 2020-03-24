'use stritc'
var {Schema, model} = require('../config/db');
var bcrypt = require('bcryptjs');


var userSchema = new Schema({
    email : {type: String, unique: true, lowercase: true },
    password : {type: String, required: true},
    active : {type: Boolean, default: false}
},{versionKey: false, timestamps: true});

//  Antes de que se ejecute guardar encrypta la contraseña
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(4);
    this.password = await bcrypt.hash(this.password, salt);
});

//  Comprueba la contraseña con la vase de datos
userSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

/**Exportamos el modelo que vamos a usar */
module.exports = model('users', userSchema);