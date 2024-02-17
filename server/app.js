const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const path = require('path');
const router =  require('./routers/route');
const todo_routes = require('./routers/todo_Routes');
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true}));

const port  = process.env.PORT||8080;

// mongoose.connect(`mongodb://localhost:27017`)
// .then(()=>{
//     console.log('database is connected');
// }).catch(err =>{
//     console.log('Connection error', err.message);
// })


mongoose.connect(`mongodb+srv://dimpy:${process.env.DB_PASSWORD}@cluster0.glj5682.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('database is connected');
}).catch(err =>{
    console.log('Connection error', err.message);
})


app.use('/',router);
app.use('/todo',todo_routes);
 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
   
})


