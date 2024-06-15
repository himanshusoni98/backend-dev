import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    videoFile:{
        type:string,
        required:true
    },
    thumbnail:{
        type:string,
        required:true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type:string,
        required:true
    },
    description:{
        type:string,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("video", videoSchema);