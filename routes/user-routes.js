const {Router} = require("express")
const User = require('../models/user')
const auth = require('../middleware/auth-middleware')
const router = Router()

router.patch('/updateData', auth, async (req,res) => {
    try {
        const {username} = req.body;
        const result = await User.findByIdAndUpdate(req.user.userId, {name: username});
        res.status(201).json(result);

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})

router.get('/getData', auth, async (req,res) => {
    try {
        const userData = await User.findById(req.user.userId);
        res.json(userData);

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})

module.exports = router