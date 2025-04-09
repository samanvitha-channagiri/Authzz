const mongoose=require('mongoose');
const {Schema}=mongoose; //destructing the Schema class


const userSchema=new Schema({
    username:{
     type:String,
     required:true,
     unique:true,
     match:/^[a-zA-Z0-0]+$/,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    refreshToken:{
        type:String,
    },
    otp:{
        type:String,
        max:6
    },
    email_verified:{
        type:Boolean,
        max:6,
        default:false
    }

})
const User=mongoose.model('User',userSchema)
module.exports=User;

//initial case, when user registers email_verified should be false
//once the login is done we need to store refreshToken
//once the user registers successfully, they'll get the otp