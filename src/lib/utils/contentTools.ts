
// receive a content 
export const isValidContent =(c:string)=>{
    const isValid = /^[a-zA-Z0-9]+$/.test(c);// chech only number and letters
    return isValid 
}