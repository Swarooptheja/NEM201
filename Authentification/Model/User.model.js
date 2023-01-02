
let mongoose=require("mongoose")

let Userschema=mongoose.Schema({
    username:String,
    hash:String,
    age:Number,
    role:{
     type:String,
     enum:["Student","Instructor","Admin"]
    }
})

let Usermodel=mongoose.model("role",Userschema)

module.exports={
    Usermodel
}