import User from '../models/user.model.js';
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword){
            res.status(400).json({error: "Passwords don't match"});
        }
        const user = await User.findOne({username});
        if(user){
            res.status(400).json({error: "Username already exists"});
        }

        //Hash password here
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        if(newUser){

            // Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

            res.status(201).json({
            _id: newUser.id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
        } else {
            res.status(400).json({error: "Invalid User data"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}
export const login = (req, res) => {
    console.log("loginUsers")
}
export const logout = (req, res) => {
    console.log("logoutUsers")
}