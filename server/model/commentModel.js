import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
content:{
    type:String,
    required:true
},
tag:Object,
reply:mongoose.Types.ObjectId,
likes:[{type: mongoose.Types.ObjectId, ref:'user'}],
user:{type:mongoose.Types.ObjectId, ref:'user'},
postId: mongoose.Types.ObjectId,
postUserId:mongoose.Types.ObjectId
},{
    timestamps:true
})

export const Comment=   mongoose.model('comment',commentSchema)