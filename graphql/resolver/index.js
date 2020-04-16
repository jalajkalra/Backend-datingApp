const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/user');
const Profile = require('../../model/profile');
const Chat = require('../../model/chat');
const Likes = require('../../model/likes');


const singleUser = async(id)=>{
    try{
        const user = await Profile.findById(id);
        return{...user._doc,_id:user.id}
    }catch(err){
        throw err;
    }
     
}
const singleLikes = async(id)=>{
    try{
        const user = await Likes.findById(id);
        return{...user._doc,_id:user.id}
    }catch(err){
        throw err;
    }
     
}
module.exports = {
    matchedProfile:async(req)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const user = await User.findById(req.userId);
        const matches = await Likes.findById(user.likes);
        let profileMatch = [];
        for(let i=0;i<matches.likedBy.length;i++){
            for(let j=0;i<matches.youLiked.length;i++){
                if(matches.likedBy[i]==matches.youLiked[j]){
                    profileMatch.push(matches.likedBy[i]);
                }
            }
        }
        return profileMatch;
    },
    chat:async({sender},req)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const messages = Chat.find({sender:sender,reciever:req.userId});
        return messages.map(message=>{
            return{...message,_id:message.id}
        })
    },
    profile: async()=>{
        const profiles = await Profile.find();
        return profiles.map(profile=>{
            return{
                ...profile._doc,
                _id:profile.id,
            }
        })
    },
    user: async()=>{
        try{
            const user = await User.find();
            return user.map(info=>{
                return{
                    ...info._doc,
                    _id:info.id,
                    dob:new Date(info._doc.dob).toISOString(),
                    profileId:singleUser(info._doc.profileId),
                    likes:singleLikes(info._doc.likes)
                }
            })
        }catch(err){
            throw err
        }
    },
    login:async({email,password})=>{
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("User Does Not Exist");
        }
        const isEqual = await bcrypt.compare(password,user.password)
        if(!isEqual){
            throw new Error("User Does Not Exist")
        }
        const token = await jwt.sign({userId:user.id,email:email},"somesecretkey",{expiresIn:1});
        return{userId:user.id,token:token,tokenExpiration:1};
    },
    createUser:async(args)=>{
        const user=await User.findOne({email:args.userInput.email});
        if(user){
            throw new Error("User Already Exist!!");
        }
        const hashedPassword =await bcrypt.hash(args.userInput.password,12);
        const profile = new Profile({
            firstName:"User",
            lastName:"",
            intrestedIn:"",
            height:"",
            religion:"", 
            drinks:"",
            smokes:"",
            profession:"",
            intrests:"",
            about:"",
            image:""
        })
        const userProfile = await profile.save();
        const likes = new Likes({
            count:0,
            likedBy:[],
            youLiked:[]
        })
        const userLikes = await likes.save();
        const signUp = new User({
            email:args.userInput.email,
            password:hashedPassword,
            dob:args.userInput.dob,
            username:args.userInput.username,
            gender:args.userInput.gender,
            profileId:userProfile.id,
            likes : userLikes.id
        })
        const result = await signUp.save();
        return{...result._doc,_id:result.id}
    },
    updateProfile:async(args,req)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const user = await User.findById(req.userId);
        const data = {
            firstName:args.profileInput.firstName,
            lastName:args.profileInput.lastName,
            intrestedIn:args.profileInput.intrestedIn,
            height:args.profileInput.height,
            religion:args.profileInput.religion, 
            drinks:args.profileInput.drinks,
            smokes:args.profileInput.smokes,
            profession:args.profileInput.profession,
            intrests:args.profileInput.intrests,
            about:args.profileInput.about,
            image:args.profileInput.image
        }
        const profile = await Profile.updateOne({_id:user.profileId},data);
        return "Successfully Updated Record"    
    },
    message:async(args,req)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const message = new Chat({
            sender:req.userId,
            reciever:args.reciever,
            message:args.message,
        })
        const result = await message.save();
        return{...result._doc,_id:result.id}
    },
    updateLikes:async({userId},req)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        const user = await User.findById(userId);
        const likes = {
            $inc:{count:1},
            $push:{likedBy:`${req.userId}`},
        }
        await Likes.updateOne({_id:user.likes},likes);
        const currUser ={
            $push:{youLiked:`${userId}`}
        }
        await User.updateOne({_id:req.userId},currUser);
        return "You Liked A Profile";

    }
}