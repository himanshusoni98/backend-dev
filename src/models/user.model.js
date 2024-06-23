import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"username is Required"],
        unique:true,
        trim: true,
        lowercase:true,
        index: true
    },
    email:{
        type:String,
        required: [true,"Email is Required"],
        unique:true,
        trim: true,
        lowercase:true,
        index: true
    },
    fullname:{
        type:String,
        required: [true,"Fullname is Required"],
        trim: true,
    },
    password:{
        type:String,
        required: [true,"Password is Required"],
        unique:true,
    },
    watchhistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String
    },
    refreshtoken:{
        type: String
    },
},{timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next();

    this.password =await bcrypt.hash(this.password,10)
    next();
})

// customMethod
userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccesstoken = function(){
    return jwt.sign(
    {
        _id: this.id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generaterefreshtoken = function(){
    return jwt.sign(
    {
        _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
const User = mongoose.model("User", userSchema);

export default User;