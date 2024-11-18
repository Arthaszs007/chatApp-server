import { authenticateJWT, authenticateNext } from './../lib/jwt/jwt';
import express from 'express';
import { SearchUser, UserLogin, UserRegister,  } from "../controllers/userCtrl";
import { test } from '../controllers/comm';

const userRouter = express.Router();

userRouter.get('/',test)
userRouter.get('/jwt',authenticateJWT,authenticateNext)//verify jwt
userRouter.post('/login',UserLogin)// user login
userRouter.post('/register',UserRegister) // user register
userRouter.get('/search/:username',SearchUser)// search user

export default userRouter;