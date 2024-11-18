
import mongoose,{Schema} from "mongoose";

export interface IContact{
    username:string, // unique sign and can't be changed
    friends:Array<{
        friend_name:string,
        friend_displayName:string,
        friend_createAt:Date,
        friend_ip?:string,
        friend_img_url?:string,
    }>

}


const contactSchema:Schema<IContact> = new mongoose.Schema({
    username:{
        type:String,
        require:false 
    },
    friends:[{
        friend_name:{
            type:String,
            reuqire:false,
        },
        friend_displayName:{
            type:String,
            require:false,
        },
        friend_createAt:{
            type:Date,
            require:false
        },
        friend_ip:{
            type:String,
            require:false
        },
        friend_img_url:{
            type:String,
            require:false
        },}]
})

const contactModel = mongoose.models.Contact || mongoose.model("contact",contactSchema)

export default contactModel