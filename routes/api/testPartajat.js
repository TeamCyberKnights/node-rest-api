const express = require('express')
const router = express.Router()
const passport = require('passport')

const TestPartajat = require('../../models/TestPartajat')

router.get('/', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let testPartajat = await TestPartajat.findAll(
            { where:{testId: req.query.testId}})
        res.status(200).json(testPartajat)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try {
        let testPartajat = await TestPartajat.findAll(
            { where:{profesorid: req.query.profesorId}})
        res.status(200).json(testPartajat)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try {
        let testPartajat = await TestPartajat.findAll(
            { where:{testId: req.query.profesorId, profesorid: req.query.profesorId}})
        res.status(200).json(testPartajat)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.post('/',async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await TestPartajat.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await TestPartajat.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})
router.delete('/:id', async (req, res) => {
    try{
        let testPartajat = await TestPartajat.findById(req.params.id)
        if (testPartajat){
            await testPartajat.destroy()
            res.status(202).json({message : 'accepted'})
        }
        else{
            res.status(404).json({message : 'not found'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})


module.exports = router