import {User} from "../models/model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../auth/generateToken.js";
import {verificationEmail} from "../nodemailer/emails.js";


export const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try {
        const checkIfExist = await User.findOne({email})
        if (checkIfExist){
            return res.status(400).json({message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000);
        const verificationTokenExpires = Date.now() + 60 * 60 * 1000;
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpires,
        })
        await newUser.save();
        const userToken =  generateToken(res,newUser._id);
        try {
            await verificationEmail(newUser.email, verificationToken);
        } catch (emailError) {
            console.warn("Email failed to send:", emailError.message);
            // continue without failing user creation
        }
        return res.status(201).json({message:"User successfully created", user: userToken});
    }catch(err){
        return res.status(400).json({message:"User failed to create user"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const checkUser = await User.findOne({email})
        if (!checkUser){
            return res.status(400).json({message: "Invalid email or password"})
        }
        if(checkUser.isVerified === false){
            return res.status(401).json({message:"You account has not been verified"})
        }
        const comparePassword = await  bcrypt.compare(password, checkUser.password)
        if (!comparePassword){
            return res.status(400).json({message: "Invalid email or password"})
        }
        const userToken = generateToken(res,checkUser._id);
        return res.status(200).json({message:"User logged in", user: userToken});

    }catch(err){
        return res.status(400).json({message:"User failed to login"})
    }
}

export const logout = async (req, res) => {
   res.cookie("token", '',{
       httpOnly: true,
       secure: true,
       sameSite: 'none',
       expires: new Date(0)
   })
    return res.status(200).json({message: "User logged out"})
}


export const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            verificationToken: req.body.code,
            verificationTokenExpires: {$gt: Date.now()}
        })
        if (!user){
            return res.status(400).json({message: "Invalid or expired code"})
        }
        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpires = undefined
        await user.save()
        res.status(200).json({message: "User verified"})
    }catch (err){
        return res.status(400).json({message:"User verification failed"})
    }
}

