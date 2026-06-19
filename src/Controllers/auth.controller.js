const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User Already Exist , try using different credentials"
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    // Important this is the token forming step (id and role)

    const token = await jwt.sign({
        id: user._id,
        role: user.role

    }, process.env.JWT_SECRET)
    console.log(token)

    res.cookie("token", token)
    res.status(201).json({

        message: "User Succesfully Signed up",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }

    })
}
async function loginUser(req, res) {
    const { username, email, password } = req.body
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }
    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message: "Successfully Signed-In",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })


}
async function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({
        message: "Logout"
    })
}
module.exports = { registerUser, loginUser, logoutUser }