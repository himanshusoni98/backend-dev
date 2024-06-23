import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    // user details from frontend
    const { fullname, username, password, email } = req.body;
    console.log("Request Body:", req.body);

    // validation
    if ([fullname, username, password, email].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All fields are required");
    }

    // check user is already exist or not
    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existUser) {
        throw new ApiError(409, "User already exists");
    }

    // check for images ,check avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    console.log("Avatar Local Path:", avatarLocalPath);
    console.log("Cover Image Local Path:", coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is a required field");
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // create user object
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email,
        username: username.toLowerCase()
    });

    // remove password and refresh token from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export default registerUser;
