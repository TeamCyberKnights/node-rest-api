const express = require('express')
const router = express.Router()
const passport = require('passport')

const RezultatTestStudent = require('../../models/RezultatTestStudent')

router.get('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let rezultatTestStudent = await RezultatTestStudent.findById(req.params.id)
        res.status(200).json(rezultatTestStudent)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let rezultatTestStudent = await RezultatTestStudent.findAll(
            { where:{testId: req.query.testId, data: req.query.data, studentId: req.query.studentId }})
        res.status(200).json(rezultatTestStudent)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let rezultatTestStudent = await RezultatTestStudent.findAll(
            { where:{studentId: req.query.studentId}})
        res.status(200).json(rezultatTestStudent)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.post('/',passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await RezultatTestStudent.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await RezultatTestStudent.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})


router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let rezultatTestStudent = await RezultatTestStudent.findAll(
            { where:{testSustinutId: req.query.testSustinutId}})
        res.status(200).json(rezultatTestStudent)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})



module.exports = router
