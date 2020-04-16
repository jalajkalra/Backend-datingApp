const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    profileId:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    likes:{
        type:Schema.Types.ObjectId,
        ref:'Likes'
    }

});

module.exports = mongoose.model('User',userSchema);
