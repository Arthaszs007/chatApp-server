import { Request, Response } from "express"
import connectDB from "../lib/dao/dao"
import contactModel from "../lib/models/contactSchema"
import { returnError, returnSuccess } from "./comm"

// get contactList
export const GetContactList=async(req:Request,res:Response)=>{

    await connectDB();
    try{
        const {username} = req.params;
        if(!username) throw new Error("Username is empty");

        const contact = await contactModel.findOne({username:username}).select("friends.friend_img_url friends.friend_displayName friends.friend_name").exec();

        if(!contact) throw new Error("Username didn't exist")

        returnSuccess(res,200,"Get successfully",contact.friends)

    }catch(e:any){
        returnError(res,400,e.message)
    }
}

//Add a new friend into the contact list, can repeat add same one or self
export const AddFriend = async(req:Request,res:Response)=>{

    await connectDB();
    try{

        const{username,friend_name,friend_displayName,friend_img_url} = req.body;

        if(!username || !friend_name||!friend_displayName||!friend_img_url) throw new Error("Params can't be empty")
        if(username === friend_name) throw new Error("Can't add your self")

        // check user exist or not  and try to get the user data ref
        const contact = await contactModel.findOne({username:username}).exec()
        if(!contact) throw new Error("User didn't exist");

        // insert data
        contact.friends.push({
            friend_name:friend_name,
            friend_displayName:friend_displayName,
            friend_img_url:friend_img_url,
            friend_createAt:new Date()
        })

        await contact.save();

        returnSuccess(res,200,"Insert friend successfully")
    }catch(e:any){
        returnError(res,400,e.message)
    }
}

//Remove a friend from the contact list
export const RemoveFrient =async(req:Request,res:Response)=>{

    await connectDB()
    try{
        const{username,friend_name} = req.body;
        if(!username ||!friend_name) throw new Error("Params can't be empty")

        const result = await contactModel.updateOne(
            {username:username},
            {$pull:{friends:{friend_name:friend_name}}}
        ).exec()

        if(result.modifiedCount ===0) throw new Error("Friend not find ")
        
            // if successfully, return the count number of remove
        returnSuccess(res,200,"Friend removed successfully",result.modifiedCount)

    }catch(e:any){
        returnError(res,400,e.message)
    }
}

//create the contact of a user after registered one time
export const CreateContact = async(req:Request,res:Response)=>{
    

    await connectDB();
    try{
        const {username} = req.body;
        if(!username) throw new Error("Username is empty")
        await contactModel.create({username,friends:[]})
        returnSuccess(res,200,"contact is Create")
       

    }catch(e:any){
        returnError(res,400,e.message)
    }
}

//delete the contact of a user after unregistered
export const DeleteContact = async()=>{

}

// check the relationship connected or not ,based on username
export const IsFriend = async(req:Request,res:Response)=>{
    await connectDB();
    try{
        const {username,friend_name} = req.params;
        if(!username || !friend_name) throw new Error("Params can't be empty")
        
        const contact = await contactModel.findOne({
            username:username,
            friends:{$elemMatch:{friend_name:friend_name}}
        }).exec()

        if(!contact) throw new Error("Not found this friend")
        
        returnSuccess(res,200,"Found friend",contact.friends)
    }catch(e:any){
        returnError(res,400,e.message)
    }

}