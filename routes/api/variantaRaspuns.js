const express = require('express')
const router = express.Router()
const passport = require('passport')

const VariantaRaspuns = require('../../models/VariantaRaspuns')

router.get('/',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try {
        let variantaRaspuns = await VariantaRaspuns.findAll({ where:{intrebareId: req.query.intrebareId}})
        res.status(200).json(variantaRaspuns)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.delete('/:id',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        let variantaRaspuns = await VariantaRaspuns.findById(req.params.id)
        if (variantaRaspuns){
            await variantaRaspuns.destroy()
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

router.get('/:id',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        let variantaRaspuns = await VariantaRaspuns.findById(req.params.id)
        res.status(200).json(variantaRaspuns)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.post('/', passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await VariantaRaspuns.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await VariantaRaspuns.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

module.exports = router