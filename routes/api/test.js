const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')


const Test = require('../../models/Test')

router.get('/hardcodat', (req, res) => {
    let teste = [
        ["Test Grupa 1071","Catalin Botezatu","Acesta este un test destinat grupei 1076","JAVA",false,20],
        ["Test Grupa 1072","Andreea Marin","Acesta este un test destinat grupei 1076","JAVA",false,20],
        ["Test Grupa 1073","Stefan Banica Jr.","Acesta este un test destinat grupei 1076","POO",false,20],
        ["Test Grupa 1071","Catalin Botezatu","Acesta este un test destinat grupei 1076","SDD",false,20],
        ["Test Grupa 1072","Andreea Marin","Acesta este un test destinat grupei 1076","POO",false,20],
        ["Test Grupa 1073","Stefan Banica Jr.","Acesta este un test destinat grupei 1076","Android",false,20],           
         ["Test Grupa 1071","Catalin Botezatu","Acesta este un test destinat grupei 1076","JAVA",false,20],
        ["Test Grupa 1072","Andreea Marin","Acesta este un test destinat grupei 1076","Web",false,20],
        ["Test Grupa 1073","Stefan Banica Jr.","Acesta este un test destinat grupei 1076","Web",false,20],
    ];
    res.status(200).json(teste);
})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let teste = await Test.findAll()
        res.status(200).json(teste)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let test = await Test.findById(req.params.id)
        res.status(200).json(test)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let test = await Test.findAll(
            { where:{nume: req.query.nume, materie: req.query.materie, profesorId: req.query.profesorId }})
        res.status(200).json(test)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.get('/',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let test = await Test.findAll(
            { where:{nume: req.query.nume}})
        res.status(200).json(test)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.put('/:id',passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let test = await Test.findById(req.params.id)
        if (test) {
            await test.update(req.body)
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
        let test = await Test.findAll(
            { where:{testSustinutId: req.query.testSustinutId}})
        res.status(200).json(test)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.post('/',passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await Test.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await Test.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})



module.exports = router
