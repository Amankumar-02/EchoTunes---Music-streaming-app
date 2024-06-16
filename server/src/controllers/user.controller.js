import {User} from '../models/user.model.js';
import {AsyncHandler} from '../utils/AsyncHandler.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';

const generateAccessToken = async(userId)=>{
    try {
        const userData = await User.findById(userId);
        // generating tokens for registered users
        const accessToken = userData.generateAccessToken();
        // save tokens to db
        return accessToken;
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something went wrong while generating access token."))
    }
};

export const userRegister = AsyncHandler(async(req, res)=>{
    const {username, email, fullname, password} = req.body;

    // Check for missing fields
    if(!(username && email && fullname && password)){
        return res.status(400).json(new ApiError(400, "All Fields are required"));
    };

    // Validate email format
    if(!email.includes("@")){
        return res.status(400).json(new ApiError(400, "Email is invalid"));
    };

    // Ensure no spaces in username and email
    if(username.includes(" ") || email.includes(" ")){
        return res.status(400).json(new ApiError(400, "remove spaces in username and email"));
    };

    // Ensure lowercase only for username and email
    if(email !== email.toLowerCase() || username !== username.toLowerCase()){
        return res.status(400).json(new ApiError(400, "only lowerCase is allowed in username and email"));
    };

    // Validate password length
    if(password.length<8){
        return res.status(400).json(new ApiError(400, "Password length must be above 8 digits"));
    };

    // Check if the user already exists
    const exists = await User.findOne({$or: [{username}, {email}]});
    if(exists){
        return res.status(400).json(new ApiError(400, "Username or email is already exists"));
    }
    const createData = await User.create({
        username,
        email,
        fullname,
        password
    });

    // check the user is created or not
    const printData = await User.findById(createData._id).select("-password");
    if(!printData){
        return res.status(500).json(new ApiError(500, "Something went wrong while registering the user."));
    };

    const accessToken = await generateAccessToken(createData._id);
    const loggedInUser = await User.findById(createData._id).select("-password");
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {user: loggedInUser, accessToken}, "User created and logged in Successfully"))
});

export const userLogin = AsyncHandler(async(req, res)=>{
    const {email_username, password} = req.body;
    if(!(email_username && password)){
        return res.status(400).json(new ApiError(400, "All fields are required"));
    };
    const dbUser = await User.findOne({
        $or: [{ email : email_username }, { username : email_username }]
    });
    if(!dbUser){
        return res.status(404).json(new ApiError(404, "User doesnot exist."));
    }
    const checkPassword = await dbUser.isPasswordCorrect(password);
    if(!checkPassword){
        return res.status(401).json(new ApiError(401, "Invalid user credentials"));
    };
    const accessToken = await generateAccessToken(dbUser._id);
    const loggedInUser = await User.findById(dbUser._id).select("-password");
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {user: loggedInUser, accessToken}, "User Logged in Successfully"))
});

export const userLogout = AsyncHandler(async(req, res)=>{
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out successfully"))
});

// export const findAll = AsyncHandler(async(req, res)=>{
//     const ownUsername = req.user;
//     const user = await User.find().select("-password -_id -createdAt -updatedAt -__v -fullname -email");
//     return res.status(200).json(new ApiResponse(200, user, "All Users"));
//     // const filteredUsers  = users.filter(user=>user.username !== ownUsername.username);
//     // if(filteredUsers.length<=0){
//     //     req.flash("findAllData", "No other User");
//     //     res.redirect("/profile");
//     // }else{
//     //     req.flash("findAllData", filteredUsers);
//     //     res.redirect("/profile");
//     // }
// });

// export const deleteUser = AsyncHandler(async(req, res)=>{
//     const {email_username} = req.body;
//     if(!email_username){
//         return res.status(400).json(new ApiError(400, "Field are required"));
//     };
//     const user = await User.findOneAndDelete({
//         $or: [{
//             username: email_username},
//             {email : email_username,
//         }]
//     }).select("-password");
//     if(!user){
//         return res.status(400).json(new ApiError(400, "User not found"))
//     }else{
//         return res.status(200).json(new ApiResponse(200, user, "User is removed SuccessFully"));
//     }
// });

export const changeCurrentPassword = AsyncHandler(async(req, res)=>{
    const {oldPassword, newPassword, confirmPassword} = req.body;
    // if any one is not present
    // if(!(newPassword || newPassword || confirmPassword)){
    // all three are necessory to present

    // Check if all required fields are present
    if(!(oldPassword && newPassword && confirmPassword)){
        return res.status(401).json(new ApiError(401, "All fields are required"));
    }

    // Check if the new password and confirm password are at least 8 characters long
    if((newPassword || confirmPassword).length<8){
        return res.status(401).json(new ApiError(401, "password must be above 8 digits"));
    }

    // Check if the new password and confirm password match
    if(newPassword !== confirmPassword){
        return res.status(401).json(new ApiError(401, "New password does not match"));
    }

    const userData = await User.findById(req.user?._id);
    const isGetPasswordCorrect = await userData.isPasswordCorrect(oldPassword);
    if(!isGetPasswordCorrect){
        return res.status(400).json(new ApiError(400, "old password does not match"));
    }
    userData.password = newPassword;
    await userData.save({validateBeforeSave: false});
    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"))
});

export const updateAccountDetails = AsyncHandler(async(req, res)=>{
    const {username, email, fullname} = req.body;

    // Check if all required fields are present
    if(!(username && email && fullname)){
        return res.status(400).json(new ApiError(400, "All fields are required"));
    };

    // Validate email format
    if(!email.includes("@")){
        return res.status(400).json(new ApiError(400, "Email is invalid"));
    };
    
    // Ensure no spaces in username and email
    if(username.includes(" ") || email.includes(" ")){
        return res.status(401).json(new ApiError(401, "remove spaces in username and email"));
    };
    
    // Check if username and email are lowercase
    if(email !== email.toLowerCase() || username !== username.toLowerCase()){
        return res.status(400).json(new ApiError(400, "only lowerCase is allowed in username and email"));
    };
    const exists = await User.findOne({
        $or: [{username}, {email}],
        _id: {$ne: req.user?._id}
    });
    if(exists){
        return res.status(401).json(new ApiError(401, "username or email already exists"));
    };
    const userData = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                username,
                email,
                fullname,
            }
        },
        {
            new : true,
        }
    ).select('-password');
    return res.status(200).json(new ApiResponse(200, userData, "Account details update successfully"));
});

export const checkUserLoginOrNot = AsyncHandler(async(req, res)=>{
    try {
        // take accessToken from cookies
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            // res.status(401)
            // .json(new ApiError(401, "Unauthorized request User is loggedOut"))
            res.status(200).json(new ApiResponse(200, {status: false}, "User is logged out"))
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
            // req.user = authUser;
            // next();
            res.status(200).json(new ApiResponse(200, {status: true, resource: authUser}, "user is logged in"))
        }
    } catch (error) {
        res.status(401).json(new ApiError(401, "Invalid access token"));
    };
})

export const loginUserDets = AsyncHandler(async(req, res)=>{
    try {
        // take accessToken from cookies
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            // res.status(401)
            // .json(new ApiError(401, "Unauthorized request User is loggedOut"))
            res.status(200).json(new ApiResponse(200, {status: false}, "User is logged out"))
            // .redirect('/')
        } else {

            // verify the access token is match with server access token
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            // get user dets.
            const authUser = await User.findById(decodedToken?._id).select('-password').populate(["songs", "playlists"]);
            
            // check the access token user is available in database
            if (!authUser) {
                res.status(401).json(new ApiError(401, "Invalid access token"))
            };
            // req.user = authUser;
            // next();
            res.status(200).json(new ApiResponse(200, {status: true, resource: authUser}, "user is logged in"))
        }
    } catch (error) {
        res.status(401).json(new ApiError(401, "Invalid access token"));
    };
})

export const updateCoverImage = AsyncHandler(async(req, res)=>{
    const {coverimage} = req.body;
    const result = await User.findByIdAndUpdate(req.user?._id, {
        coverimage: coverimage
    });
    if(!result){
        return res.status(401).json(new ApiError(401, "CoverImg is not change"));
    };
    return res.status(200).json(new ApiResponse(200, result, "CoverImg updated successfully"))
});