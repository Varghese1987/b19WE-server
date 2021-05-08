const express = require("express");
const app = express();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const dbUrl = "mongodb+srv://varghese:varghese@cluster0.brthd.mongodb.net/<dbName>?retryWrites=true&w=majority"
const localUrl = "mongodb://localhost:27017"
// 1.Open the connection
// 2.select the DB
// 3.select the collection
// 4.perform the operation(CRUD)
// 5.close Connection

app.use(express.json());

const cors = require('cors');  
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome")
})


app.get("/students",(req,res)=>{
    res.status(200).json(students);
})

app.post("/user-create", async(req,res)=>{
    const client = await mongoClient.connect(dbUrl)
   try {
    const db = client.db("b19we");
    const user = await db.collection("users").insertOne(req.body)
    res.json({
        message:"record Created"
    })
    } catch (error) {
        res.json({
            message:"Something Went Wrong"
        })
    }finally{
        client.close();
    }
})


app.get("/get-users", async(req,res)=>{
    const client = await mongoClient.connect(dbUrl)
   try {
    const db = client.db("b19we");
    const users = await db.collection("users").find().toArray();
    res.json(users)
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something Went Wrong"
        })
    }finally{
        client.close();
    }
})

app.get("/single-user/:id",async(req,res)=>{
    const client = await mongoClient.connect(dbUrl);
    // const sampleId = `ObjectId(${req.params.id})`
    const objId = mongodb.ObjectID(req.params.id)
    try {
     const db = client.db("b19we");
     const user = await db.collection("users").findOne({_id:objId})
     res.json(user)
     } catch (error) {
         console.log(error)
         res.json({
             message:"Something Went Wrong"
         })
     }finally{
         client.close();
     }
    
})

app.put("/update-user/:id",async (req,res)=>{

    const client = await mongoClient.connect(dbUrl);
    const objId = mongodb.ObjectID(req.params.id)
    try {
     const db = client.db("b19we");
     const user = await db.collection("users").findOne({_id:objId})
     if(!user){
         res.json({
             message:"No user available"
         })
     }
     else{
         const updatedUser = await db.collection("users").findOneAndUpdate({_id:objId},{$set:{name:req.body.name}})
         res.json({
             message:"Record updated"
         })
     }
     } catch (error) {
         console.log(error)
         res.json({
             message:"Something Went Wrong"
         })
     }finally{
         client.close();
     }
})

app.delete("/delete-user/:id",async(req,res)=>{

    const client = await mongoClient.connect(dbUrl);
    const objId = mongodb.ObjectID(req.params.id)
    try {
     const db = client.db("b19we");
     const user = await db.collection("users").findOne({_id:objId})
     if(!user){
         res.json({
             message:"No user available"
         })
     }
     else{
         const updatedUser = await db.collection("users").findOneAndDelete({_id:objId})
         res.json({
             message:"Record deleted"
         })
     }
     } catch (error) {
         console.log(error)
         res.json({
             message:"Something Went Wrong"
         })
     }finally{
         client.close();
     }
})


app.get("/users",(req,res)=>{
    res.status(200).json({
        message:"Students",
        totalUsers:50
    })
})



const port = 5000
app.listen(port,()=>{
    console.log(`Server Started in port ${port}`)
})



// students and teachers

// assign teacher to student

// student=[
//     {
//         name:"temp",
//         id:"",
//         teacher:"id"
//     }
// ]

// teacher=[
//     {
//         name:"temp-1",
//         id:"",
//         students:[1,2,3,4]
//     }
// ]

// // get all students with teacher data

// students=[
//     {
//         id:1,
//         name:"teamp",
//         teacher:{
//             name:"teamp-1",
//             id:""
//         }
//     }
// ]
// // get all teachers with student data

// teachers=[
//     {
//         id:1,
//         name:"teamp-teacher",
//         students:[
//             {
//                 name:"student-1",
//                 id:""
//             },
//             {
//                 name:"student-2",
//                 id:""
//             }
//         ]
//     }
// ]