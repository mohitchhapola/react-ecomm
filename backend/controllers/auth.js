const User = require("../models/user")
const bcrypt = require("bcryptjs")
const {sanitizeUser} = require("../services/common")
const jwt = require('jsonwebtoken')

const createUser = async(req,res)=>{
    const userData = req.body;
    // console.log(userData.email)
    try {
        const existUser = await User.findOne({email : userData.email});
        if (existUser) {
            return res.status(400).json({ message: 'User already exists' });
          }
        else{
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const user = new User({
                ...userData,
                password: hashedPassword,
              });
            // const user = new User(userData)
            const savedUser = await user.save();
            const token = await user.generateAuthToken();

            // console.log(token)
            res.status(200).json({
                user: sanitizeUser(savedUser), // Use sanitizeUser to exclude sensitive fields
                token,
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log(password,"password")
        // console.log("user.password",user.password)
        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = user.generateAuthToken();

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
            sameSite: 'lax',
        });

        // Return success response
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                address : user.addresses,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutUser = (req, res) => {
    // console.log("logout bckend")
    try {
      // Clear the token cookie
      res.cookie("token", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      });
  
      // Send success response
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


module.exports = {
    createUser,
    loginUser,
    logoutUser
}