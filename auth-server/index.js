const express=require('express')
const app=express();
const port=5500

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`App Listening to the port ${port}`);
    
})