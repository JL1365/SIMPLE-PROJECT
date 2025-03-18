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

export const getAllUsers = async (req,res) => {
    try {
    const allUsers = await User.find({},"-password"); //Exclude the password
    if(allUsers.length === 0){
        return res.status(400).json({message:"No users found!"});
    }      
    
    res.status(200).json({message:"Users retrieved successfully!",data:allUsers});
    
    } catch (error) {
    console.log(`Error in retrieving user : ${error.message}`);
    return res.status(500).json({message:"Internal Server error!"});
    }
};

export const updateUser = async (req,res) => {
    try {
    const {id} = req.params;  
    const {firstName,lastName,email} = req.body;
    
    const isEmailExist = await User.findOne({email,_id:{ $ne:id }});// not equal
    if(isEmailExist){
        return res.status(400).json({message:"Email already Exists"})
    }

    const updatedUser = await User.findByIdAndUpdate(id,{
        firstName,
        lastName,
        email,
    },{new:true}).select("-password"); // (Optional) only if you want to exclude the password in response

    await updatedUser.save();
    
    res.status(200).json({message:"User updated successfully!",data:updatedUser});

    } catch (error) {
    console.log(`Error in updating user : ${error.message}`);
    return res.status(500).json({message:"Internal Server error!"});    
    }
};

export const login = async (req,res) => {
    try {
    const {email,password} = req.body;
    if(!email ||!password) {
        return res.status(400).json({message:"All fields required!"});
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"Username or password is incorrect!"});
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:"Username or password is incorrect!"});
    }
    res.status(200).json({message:"Login successfully!",user});      
    } catch (error) {
    console.log(`Error in login : ${error.message}`);
    return res.status(500).json({message:"Internal Server error!"});           
    }
};