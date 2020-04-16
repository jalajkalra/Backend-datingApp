const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleWare/is-auth');
const graphqlSchema = require('./graphql/schema/index');
const graphqlresolver = require('./graphql/resolver/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow,Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Controll-Allow-Headers','Authorization,Content-Type');
    if(req.method==="OPTIONS"){
        return res.sendStatus(200);
    }
    next();
})
app.use(isAuth);


app.use('/graphql',graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlresolver,
    graphiql:true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-aozbi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{useNewUrlParser: true,useUnifiedTopology:true })
.then(app.listen(5000||process.env.PORT,()=>console.log("Server has started"))).catch(err=>console.log(err));
 
 