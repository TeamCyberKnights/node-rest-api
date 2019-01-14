const express = require('express')
const router = express.Router()
const passport = require('passport')

const RaspunsIntrebareGrila = require('../../models/RaspunsIntrebareGrila')



router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let raspunsIntrebareGrila = await RaspunsIntrebareGrila.findAll(
            { where:{intrebareId: req.query.intrebareId, rezultatTestStudentId: req.query.rezultatTestStudentId}})
        res.status(200).json(raspunsIntrebareGrila)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.post('/',passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await RaspunsIntrebareGrila.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await RaspunsIntrebareGrila.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.put('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let raspunsIntrebareGrila = await RaspunsIntrebareGrila.findById(req.params.id)
        if (raspunsIntrebareGrila) {
            await raspunsIntrebareGrila.update(req.body)
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
