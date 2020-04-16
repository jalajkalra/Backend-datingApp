const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    intrestedIn:{
        type:String,
    },
    height:{
        type:String,
    },
    religion:{
        type:String,
    }, 
    drinks:{
        type:String,
    },
    smokes:{
        type:String,
    },
    profession:{
        type:String,
    },
    intrests:{
        type:String,
    },
    about:{
        type:String,
    },
    image:{
        type:String,
    }

});

module.exports = mongoose.model('Profile',profileSchema);