'use stritc'
var {Schema, model} = require('../config/db');


var ordenesSchema = new Schema({
    codOrden : {type: String, required: true},
    typeInstalation: {type: String, required: true },
    meter: {type: Number, default: 0},
    point: {type: Number, required: true, default: 0},
    description: {type: String},
    dateInstalation: {type: Date, required: true},
    user_id: {type: Schema.Types.ObjectId}

},{versionKey: false, timestamps: true});


ordenesSchema.virtual('getDate')
    .get(function () {
        var options = {year: 'numeric', monht: 'long', year: 'numeric'};
        
        return this.dateInstalation.toISOString(options).split('T')[0];
    });

/**Exportamos el modelo que vamos a usar */
module.exports = model('ordenes', ordenesSchema);