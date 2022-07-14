const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
      firstname:{
          type:String,
          required:true
      },
      lastname:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      gender:{
        type:String,
        required:true
      }, 
      phone:{
        type:Number,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      confirmpassword:{
        type:String,
        required:true
      }
});

employeeSchema.methods.generateAuthyToken = async function(){
  try{
    const token = jwt.sign({_id:this._id.tostring()},"mynameisabhaysinghrathaurvikramsingh");
  } catch(err){
    res.send("The error part" + err);
    console.log("The error part" + err);
}
}

employeeSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);  
    this.confirmpassword = undefined;
  }
  next();
})
const Register = new mongoose.model("Register", employeeSchema );

module.exports = Register;