import { NextFunction, Request, Response } from "express"
import { jwt_key } from "../../conifg/userConf"
import { returnError, returnSuccess } from "../../controllers/comm"
import jwt from "jsonwebtoken"

// receive the username to generate jwt
export const generateJWT=(username:string)=>{
    const token = jwt.sign({username},jwt_key,{expiresIn:"1h"})
    return token
}

//check the headers token, if success, unpackage user and continue running ,otherwise break and response error
export const authenticateJWT=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader =  req.headers.authorization; // get the token from header 

    if(authHeader){
        const token = authHeader.split(' ')[1]// pick token without the "bearer"

        jwt.verify(token,jwt_key,(err:any,user:any)=>{
            if(err){
              return  returnError(res,400,"Token is invalid")
            }
            
            (req as any).user = user;
            next();
        })
    }else{
        return returnError(res,400,"Authorization header missed")
    }
}
// after passed jwt verify , return username to client
export const authenticateNext=(req:Request,res:Response)=>{
    const username = (req as any).user?.username

    if(username){
        return returnSuccess(res,200,"jwt verify successfully",username)
    }else{
        return returnError(res,400,"Failed to get username from the token after passed jwt verify")
    }
}