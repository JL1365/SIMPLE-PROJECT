import { User } from "../models/userModel.js";

import bcrypt from "bcryptjs";

export const registerAccount = async (req,res) => {
    try {
        const {firstName,lastName,email,password} = req.body;
        if(!firstName||!lastName||!email|!password){
            return res.status(400).json({message:"All fields are required!"});
        }
        
        const userAlreadyExist = await User.findOne({email});
        
        if(userAlreadyExist){
            return res.status(400).json({message:"User already exist!"});
        }
        
        const hashedPassword = await bcrypt.hash(password,12);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword
        });
        
        await newUser.save();

        res.status(201).json({message:"User registered successfully!",data:newUser});

    } catch (error) {
        console.log(`Error in registering user : ${error.message}`);
        return res.status(500).json({message:"Internal Server error!"});
    }
};