
let express=require('express')
let mongoose=require("mongoose")
const { Usermodel } = require('./Model/User.model')
let jwt=require("jsonwebtoken")

let app=express()
app.use(express.json())


app.post("/signup",async(req,res)=>{
    let {username,password}=req.body;
    let user=new Usermodel({
        username,
        age:12,
        hash:password,
        role:'Admin' //role from frontend
    })
    await user.save()

    let token=jwt.sign({id:user._id,username:user.username,role:user.role},"SECRET")
    res.send({"token":token})

})


app.delete("/lecture/:id",(req,res)=>{
   
    let token=req.headers.authorization?.split(" ")[1]
    console.log(token)
    let {role}=jwt.verify(token,"SECRET")
    console.log(jwt.verify(token,"SECRET"))
    console.log(role)
    if(role!="Admin"){
        return res.status(403).send("you don't have access ")
    }
    else{
        return res.status(200).send("Lecture deleted successfull")
    }
})
mongoose.connect('mongodb://localhost:27017/main').then(()=>{

    app.listen(7000,()=>{
        console.log("7000 port is running")
    })
})




