const express = require('express');
const { z } = require('zod')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { User, Accounts } = require('../db');
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose')


router.get('/balance', authMiddleware, async (req, res) => {
    const val = await Accounts.findOne({ userId: req.body.userId });

    res.status(200).json({
        bal: val.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    // Implementation using Transactions
    const session = await mongoose.startSession()
    // start of transation
    session.startTransaction()

    const { to, amount } = req.body
    const account = await Accounts.findOne({ userId: req.body.userId })

    if (!account || account.balance < amount) {
        await session.abortTransaction().session(session)
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Accounts.findOne({ userId: to });
    if (!toAccount) {
        await session.abortTransaction().session(session)
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    // transfer
    await Accounts.updateOne({ userId: req.body.userId }, { $inc: { balance: -amount } }).session(session)
    await Accounts.updateOne({ userId: req.body.to }, { $inc: { balance: amount } }).session(session)

    // commiting transaction
    await session.commitTransaction()

    res.json({
        message: "Transfer successful"
    })
})



module.exports = router