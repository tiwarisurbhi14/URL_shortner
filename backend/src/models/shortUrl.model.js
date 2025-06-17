import mongoose from "mongoose";

const shorturlSchema=new mongoose.Schema({
    full_url:{
        type:String,
        required:true,
    },
    short_url:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
    click:{
        type:Number,
        default:0,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})
const shortUrl=mongoose.model("ShortUrl",shorturlSchema);
export default shortUrl;