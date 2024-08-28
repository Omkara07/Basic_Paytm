const express = require('express');
const { z } = require('zod')
const { processRequestBody } = require('zod-express-middleware')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { User, Accounts } = require('../db');
const { authMiddleware } = require('../middleware');

const signupBody = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(6)
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

const updateBody = z.object({
    // optional will allow only single feild to be updated 
    password: z.string().min(6).optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional()
})

router.post("/signup", async (req, res) => {
    // zod auth
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ msg: "Wrong Input" })
    }

    const { username, firstname, lastname, password } = req.body
    // user already exist 
    const u = await User.findOne({ username: username })
    if (u) {
        res.status(411).json({ message: 'User already exists' })
    }
    else {
        const token = jwt.sign(username, JWT_SECRET);
        try {
            const user = await User.create({ username, firstname, lastname, password })
            const bal = await Accounts.create({ userId: user._id, balance: 1 + Math.random() * 10000 })
            res.json({ message: "User created successfully", token })
        }
        catch (e) {
            res.status(411).json({ msg: e })
        }
    }
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ msg: 'Invalud Input' })
    }
    const username = req.body.username
    const token = jwt.sign(username, JWT_SECRET);
    const user = await User.findOne({ username: username });
    if (user) {
        res.status(200).json({ msg: 'Logged in successfully', token })
    }
    else res.status(411).json({ msg: 'Error Signing in' })
})

router.put('/update', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({ msg: "Error while updating information" })
    }

    const { username } = req.body
    const updatedUser = await User.updateOne({ username: username }, req.body)
    if (updatedUser) {
        res.status(200).json({
            message: "Updated successfully"
        })
    }
    else {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
})

router.get("/getUser", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        // logical or operator works on an array of elements 
        $and: [{
            $or: [{
                firstname: {
                    // regex to match the patterns 
                    "$regex": filter
                }
            }, {
                lastname: {
                    "$regex": filter
                }
            }]
        }, {
            username: { $ne: req.body.username }
        }]


    })

    res.json({
        users: users
    })
})

router.get("/me", authMiddleware, async (req, res) => {
    res.json({
        user: req.body
    })
})

module.exports = router