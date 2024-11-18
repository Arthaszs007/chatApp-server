
import mongoose,{Schema} from "mongoose";

export interface IUser{
    displayName?:string,
    username:string, // unique sign and can't be changed
    email?:string,
    password:string,
    createAt:Date,
    ip?:string,
    img_url?:string,
}


const userSchema:Schema<IUser> = new mongoose.Schema({
    displayName:{
        type:String,
        require:false 
    },
    username:{
        type:String,
        reuqire:false,
    },
    email:{
        type:String,
        require:false,
    },
    password:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        require:false
    },
    ip:{
        type:String,
        require:false
    },
    img_url:{
        type:String,
        require:false
    },
})

const userModel = mongoose.models.User || mongoose.model("user",userSchema)

export default userModel