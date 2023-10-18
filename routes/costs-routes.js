const {Router} = require("express")
const Cost = require('../models/cost')
const auth = require('../middleware/auth-middleware')
const router = Router()

router.post('/new', auth, async (req, res) => {
    try {
        const {name, price, date} = req.body;

        const cost = new Cost({name, price, date, owner: req.user.userId});
        await cost.save();
        res.status(201).json({cost});

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const costs = await Cost.find({owner: req.user.userId});
        res.json(costs);

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const cost = await Cost.findById(req.params.id);
        res.json(cost);
        
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
})

module.exports = router