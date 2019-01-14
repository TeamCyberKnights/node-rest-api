const express = require('express')
const router = express.Router()
const passport = require('passport')

const TestSustinut = require('../../models/TestSustinut')


router.post('/', passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await TestSustinut.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await TestSustinut.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try {
        let testSustinut = await TestSustinut.findAll({ where:{profesorId: req.query.profesorId}})
        res.status(200).json(testSustinut)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/:id', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let testSustinut = await TestSustinut.findById(req.params.id)
        res.status(200).json(testSustinut)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

module.exports = router