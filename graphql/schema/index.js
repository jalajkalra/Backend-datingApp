const {buildSchema} = require("graphql");

module.exports = buildSchema(`
type Likes {
    _id:ID!
    count:Int!
    youLiked:[String]
    likedBy:[String]
}
type Chat{
    _id:ID!
    message:String!
    sender:String!
    reciever:String!
}
type Profile{
    _id:ID!
    firstName:String
    lastName:String
    intrestedIn:String
    height:String
    religion:String
    drinks:String
    smokes:String
    profession:String
    intrests:String
    about:String
    image:String
}
type User {
    _id:ID!
    username:String!
    email:String!
    profileId:Profile!
    likes: Likes!
}
type AuthData {
    token:String!
    userId:ID!
    tokenExpiration:Int!
}
input UserInput{
    username:String!
    email:String!
    password:String!
    dob:String!
    gender:String!
}
input ProfileInput{
    firstName:String
    lastName:String
    intrestedIn:String
    height:String
    religion:String
    drinks:String
    smokes:String
    profession:String
    intrests:String
    about:String
    image:String
}
type RootQuery {
    user:[User!]!
    profile:[Profile!]!
    login(email:String!,password:String!):AuthData!
    chat(sender:String!):[Chat!]!
    matchedProfile:[String]
}
type RootMutation {
    createUser(userInput:UserInput):User!
    updateProfile(profileInput:ProfileInput):String
    message(reciever:String!,message:String!):Chat!
    updateLikes(userId:String!):String
}
schema {
    query:RootQuery
    mutation:RootMutation
}
`)