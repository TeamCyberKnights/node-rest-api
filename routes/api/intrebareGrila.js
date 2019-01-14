const express = require('express')
const router = express.Router()
const passport = require('passport')


const IntrebareGrila = require('../../models/IntrebareGrila')


router.get('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let intrebareGrila = await IntrebareGrila.findById(req.params.id)
        res.status(200).json(intrebareGrila)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let intrebareGrila = await IntrebareGrila.findAll(
            { where:{testId: req.query.testId}})
        res.status(200).json(intrebareGrila)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let intrebareGrila = await IntrebareGrila.findAll(
            { where:{profesorId: req.query.profesorId}})
        res.status(200).json(intrebareGrila)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let intrebareGrila = await IntrebareGrila.findAll(
            { where:{text: req.query.text, materie: req.query.materie, profesorId: req.materie.profesorId}})
        res.status(200).json(intrebareGrila)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.delete('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let intrebareGrila = await IntrebareGrila.findById(req.params.id)
        if (intrebareGrila){
            await intrebareGrila.destroy()
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

router.put('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let intrebareGrila = await IntrebareGrila.findById(req.params.id)
        if (intrebareGrila) {
            await intrebareGrila.update(req.body)
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

router.post('/',passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await IntrebareGrila.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await IntrebareGrila.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

module.exports = router
