const {Router} = require("express")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("config")
const {check, validationResult } = require('express-validator')
const User = require('../models/user')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 8 characters').isLength({min: 8}),
        check('name', 'Minimum name length 3 characters').isLength({min: 3})
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }

        const {email, password, name} = req.body

        const candidate = await User.findOne({email})
        if(candidate) {
            return res.status(400).json({message: 'This email is already in use'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword, name})

        await user.save()

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.status(201).json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 8 characters').exists(),
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: 'Incorrect password '})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id, username: user.name})


    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})


module.exports = router