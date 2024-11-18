import  express  from 'express';
import { AddFriend, CreateContact, GetContactList, IsFriend, RemoveFrient } from '../controllers/contactCtrl';



const contactRouter = express.Router();

contactRouter.get("/test",CreateContact)
contactRouter.post("/create",CreateContact) // create contact
contactRouter.post("/add",AddFriend)    // add friend into contact
contactRouter.get("/get/:username",GetContactList)  // get contact list
contactRouter.post("/remove",RemoveFrient) // remove friend from friend list
contactRouter.get("/is/:username/:friend_name",IsFriend)// check whether is a friend relationship

export default contactRouter;