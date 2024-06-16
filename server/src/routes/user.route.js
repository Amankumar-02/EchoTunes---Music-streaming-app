import { Router } from "express";
import { userRegister, userLogin, userLogout, changeCurrentPassword, updateAccountDetails, checkUserLoginOrNot, loginUserDets, updateCoverImage} from '../controllers/user.controller.js';
import { verifyJWT, isLoggedOut } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.get("/", (req, res)=>{
    res.send("Login Dashboard");
})
userRouter.get("/profile", verifyJWT, (req, res)=>{
    res.send("Profile Dashboard");
})


// userRegister call route
userRouter.post("/userregister", isLoggedOut, userRegister);
// userLogin call route
userRouter.post("/userlogin", isLoggedOut, userLogin);
// userLogout call route
userRouter.get("/userlogout", verifyJWT, userLogout);
userRouter.get("/checkUserLoginOrNot", checkUserLoginOrNot);
userRouter.get("/loginUserDets", loginUserDets);


// userRouter.get("/find", verifyJWT, findAll);
// userRouter.post("/delete", deleteUser);
userRouter.patch("/changeCurrent", verifyJWT, changeCurrentPassword);
userRouter.patch("/updatedetails", verifyJWT, updateAccountDetails);
userRouter.patch("/updateCoverImage", verifyJWT, updateCoverImage);