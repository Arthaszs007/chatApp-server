import  express from "express";
import userRouter from "./userRouter"
import contactRouter from "./contactRouter";


const router = express.Router();

router.use('/api/user',userRouter);
router.use('/api/contact',contactRouter)

export default router;