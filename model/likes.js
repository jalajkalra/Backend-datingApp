const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    count:{
        type:Number,
    },
    likedBy:[{
        type:String,
    }],
    youLiked:[{
        type:String,
    }] 
})

module.exports=mongoose.model('Likes',likeSchema)