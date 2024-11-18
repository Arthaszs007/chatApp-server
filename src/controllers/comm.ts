import { Response } from "express";
import { generateJWT } from "../lib/jwt/jwt";

// return the msg and data
export function returnSuccess(res:Response,code:number= 200,msg:string="Success",data:any = null){
    res.status(code).json({msg,data})
}
// return the msg
export function returnError(res:Response,code:number = 400,msg:string ="error"){
    res.status(code).json({msg})
}

export const test =async(res:Response)=>{
    const token =  generateJWT("222")

    console.log(token)

}