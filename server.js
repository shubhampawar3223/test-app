const express = require('express');
const app = express();
const mongodb = require("mongodb");
require('dotenv').config()
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 5000;

app.use(express.json());


app.get("/",async (req,res)=>{
//res.send("Connected");
   try{
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("student");
    let data = await db.collection("users").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
   }
   catch(error){
       console.log(error);
   }
})


app.post('/create',async(req,res)=>{
   try{
    const clientInfo = await mongoClient.connect(dbUrl); 
    const db = clientInfo.db("student");
    await db.collection('users').insertMany(req.body);
    res.status(200).json({message:"data created"});
    clientInfo.close(); 
   }
   catch(e){
    console.log(e);
   }
})
app.listen(port,()=> console.log("Server is listening on port port"));
