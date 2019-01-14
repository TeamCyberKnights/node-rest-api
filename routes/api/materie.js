const express = require('express')
const router = express.Router()
const passport = require('passport')

const Materie = require('../../models/Materie')



router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let materie = await Materie.findAll()
        res.status(200).json(materie)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let materie = await Materie.findAll(
            { where:{nume: req.query.nume}})
        res.status(200).json(materie)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let materie = await Materie.findAll(
            { where:{profesorId: req.query.profesorId}})
        res.status(200).json(materie)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})


module.exports = router