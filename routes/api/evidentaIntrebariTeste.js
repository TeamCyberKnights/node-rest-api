const express = require('express')
const router = express.Router()
const passport = require('passport')


const EvidentaIntrebariTeste = require('../../models/EvidentaIntrebariTeste')


router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let evidentaIntrebariTeste = await EvidentaIntrebariTeste.findAll({ where:{testId: req.query.testId}})
        res.status(200).json(evidentaIntrebariTeste)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.delete('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let evidentaIntrebariTeste = await EvidentaIntrebariTeste.findById(req.params.id)
        if (evidentaIntrebariTeste){
            await evidentaIntrebariTeste.destroy()
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

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let evidentaIntrebariTeste = await EvidentaIntrebariTeste.findAll({ where:{intrebareId: req.query.intrebareId}})
        res.status(200).json(evidentaIntrebariTeste)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let evidentaIntrebariTeste = await EvidentaIntrebariTeste.findAll({ where:{intrebareId: req.query.intrebareId, testId: req.query.intrebareId}})
        res.status(200).json(evidentaIntrebariTeste)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})


router.post('/',passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await EvidentaIntrebariTeste.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await EvidentaIntrebariTeste.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

module.exports = router
