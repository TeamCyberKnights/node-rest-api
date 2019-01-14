const express = require('express')
const router = express.Router()
const passport = require('passport')

const EvidentaMateriiProfesori = require('../../models/EvidentaMateriiProfesori')



router.post('/',passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await EvidentaMateriiProfesori.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await EvidentaMateriiProfesori.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let evidentaMateriiProfesori = await EvidentaMateriiProfesori.findById(req.params.id)
        res.status(200).json(evidentaMateriiProfesori)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let evidentaMateriiProfesori = await EvidentaMateriiProfesori.findAll(
            { where:{materieId: req.query.materieId, profesorId: req.query.profesorId}})
        res.status(200).json(evidentaMateriiProfesori)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

module.exports = router