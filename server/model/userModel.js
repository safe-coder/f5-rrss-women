 import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        maxlength:25,
        require:true
    },
    fullname:{
        type:String,
        trim:true,
        required:true,
        maxlength:25,

    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{  
        type:String,
        default:'',

    },
    website:{
        type:String,
        default:'',
    },
    role:{
        type:String,
        default:'user'
    },
    avatar:{
        type:String,
        default:'https://i.postimg.cc/h48xQ8B0/ava.png'
    },
    banner:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/thumbnails/001/984/880/small/abstract-colorful-geometric-overlapping-background-and-texture-free-vector.jpg'
    },
    story:{
        type:String,
        default:'',
        maxlength:200,

    },
    friends:[{type:mongoose.Types.ObjectId, ref:'user'}],
    following:[{type:mongoose.Types.ObjectId, ref:'user'}]


},{
    timestamps:true
})

export const Users=  mongoose.model('user', userSchema)