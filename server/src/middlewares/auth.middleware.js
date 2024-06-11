import jwt from 'jsonwebtoken';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import  {ApiError}  from '../utils/ApiError.js';
import { User } from '../models/user.model.js';

export const verifyJWT = AsyncHandler(async(req, res, next)=>{
    try {
        // take accessToken from cookies
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            res.status(401)
            .json(new ApiError(401, "Unauthorized request User is loggedOut"))
            // .redirect('/')
        } else {

            // verify the access token is match with server access token
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            // get user dets.
            const authUser = await User.findById(decodedToken?._id).select('-password');
            
            // check the access token user is available in database
            if (!authUser) {
                res.status(401).json(new ApiError(401, "Invalid access token"))
            };
            req.user = authUser;
            next();
        }
    } catch (error) {
        res.status(401).json(new ApiError(401, "Invalid access token"));
    };
});

// this middlware pass the user data if login or not
export const verifyOrNot = AsyncHandler(async(req, res, next)=>{
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            req.user = "";
            next();
        } else {
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const authUser = await User.findById(decodedToken?._id).select('-password');
            if (!authUser) {
                res.status(401).json(new ApiError(401, "Invalid access token"))
            };
            req.user = authUser;
            next();
        }
    } catch (error) {
        res.status(401).json(new ApiError(401, "Invalid access token"));
    };
});

export const isLoggedOut = AsyncHandler(async(req, res, next)=>{
    try {
        // take accessToken from cookies
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            // if cookies not found it means user is loggedOut
            next();
        } else {
            // check the token is match or not
            // const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            // if(decodedToken){
                res.status(401)
                .json(new ApiError(401, "Unauthorized request User is loggedIn"))
                // res.redirect('/profile');
            // }
        }
    } catch (error) {
        res.status(401).json(new ApiError(401, "Invalid access token"));
    };
});