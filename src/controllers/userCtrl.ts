import { Request, Response } from 'express';
import connectDB from "../lib/dao/dao"
import userModel, { IUser } from "../lib/models/userSchema";
import { returnError, returnSuccess } from './comm';
import { saltMax } from '../conifg/userConf';
import { generateJWT } from '../lib/jwt/jwt';
// const bcrypt = require('bcryptjs');
import bcrypt from "bcryptjs"

export async function UserLogin(req:Request,res:Response){
    await connectDB();
    try{
        const {username,password} = req.body;
        
        //check user input
         if(!username|| !password ) throw new Error("Params can't be empty")
        //content length and character valid check


        // check the userName existed?
        if(!await isUserExist(username)) throw new Error("Username doesn't exist");
    
        if(!await comparePasswordwithUserName(username,password)) throw new Error("Password is wrong")
        
        const token = generateJWT(username)
    
        returnSuccess(res,undefined,"login successfully",{username,token})
    }catch(e:any){
        returnError(res,undefined,e.message)
    }
   
    
}

// read the params from json body and  write data into DB
export async function UserRegister(req:Request,res:Response){
    await connectDB();
    try {
    const {username,password,repeat} = req.body;
    const displayName = "default";
    //check user input
    if(!username|| !password || !repeat || !displayName) throw new Error("Params can't be empty")
    //content length and character valid check

    
    //password repeat match check
    if(password !== repeat) throw new Error("Two times password must be same");
    // check the userName existed?
    if(await isUserExist(username)) throw new Error("Username existed");

    // get user IP
    const ip = getIP(req);

    // hash the password
    const hashStr = await hashPassword(password,saltMax)

    const user : IUser={
        username:username,
        password:hashStr,
        displayName:displayName,
        email:"",
        createAt:new Date(),
        ip:ip,
        img_url:"",

    }

    createUser(res,user);

    }catch(e:any){
        returnError(res,undefined,e.message)
    }
    
}

//search user based on username
export const SearchUser = async(req:Request,res:Response)=>{

    await connectDB();

    try{
        const {username} = req.params;
        if(!username) throw new Error("Username can't be empty");

        const user =await userModel.findOne({username:username}).select("username displayName ip img_url").exec()
        if(!user) throw new Error("Not find user") 

        returnSuccess(res,200,"Found user",[user])//return data as a array type,easy to extand in future

    }catch(e:any){
        returnError(res,400,e.message)
    }

}

// get IP from user request
const getIP=(req:Request)=>{
    const ip = req.ip || req.headers['x-forwarded-for']||req.socket.remoteAddress;
    if(Array.isArray(ip)) return ip[0]
    return ip
}
// check the username exist or not
const isUserExist =async(username:string)=>{
    await connectDB();
    try{
        const res = await userModel.findOne({username:username}).exec()

        if (res) return true 
        else  return false 
    }catch(e:any){
        throw new Error(e.message)
    }
}
// use to write data into DB
const createUser = async(res:Response, user:IUser)=>{
    await connectDB();
    try{
        await userModel.create(user);
        returnSuccess(res,undefined,undefined,user)
    }catch(e:any){
        returnError(res,undefined,e.message)
    }
}

// receive two args , password and max to mix hash
const hashPassword = async(password:string,saltMax:number)=>{
    const salt = await bcrypt.genSalt(saltMax);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword
}

// receive  username and password and compare password,if same return true , or false 
const comparePasswordwithUserName = async(username:string,password:string)=>{
    await connectDB()
    try{
        // hash user input and compare with DB
        const user =await userModel.findOne({username:username}).exec();
        
        return await bcrypt.compare(password,user.password)

    }catch(e:any){
        throw new Error(e.message)
    }

    

}