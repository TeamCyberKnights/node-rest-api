const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


//Load Input Validation
const validateRegisterInput = require('../../validation/register')

const Profesor = require('../../models/Profesor')
const Student = require('../../models/Student')


router.post('/inregistrare',(req, res) => {
    const { errors, isValid} = validateRegisterInput(req.body)

    // validare
    // if(!isValid) {
    //     return res.status(400).json(errors)
    // }

    Profesor.findOne({ where:{mail: req.body.mail}}).then( profesorNou => {
            if (profesorNou) {
                errors.email = 'Acest email exista deja'
                return res.status(400).json(errors)
            }

        if (!profesorNou) {

                profesorNou = new Profesor({
                    nume: req.body.nume,
                    prenume: req.body.prenume,
                    parola: req.body.parola,
                    mail: req.body.mail
                })
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(profesorNou.parola, salt, (err, hash) => {
                    if (err)
                        throw err
                    profesorNou.parola = hash
                    profesorNou.save()
                        .then(profesor => res.json(profesor))
                        .catch((err) => console.log(err))
                })
            })
    })
 })


router.post('/login', (req, res) => {
    const mail = req.body.mail
    const parola = req.body.parola

    // gaseste user dupa mail
    Profesor.findOne({ where:{mail: mail}})
        .then(profesor => {


            // verificare
            if (!profesor) {
                return res.status(404).json({email : 'Emailul introdus nu exista'})
            }

            //verifica parola
            bcrypt.compare(parola, profesor.parola)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched

                        const payload = { id: profesor.id,
                            nume: profesor.nume, prenume: profesor.prenume, profesor : true} // creaza jwt payload

                        // semnare token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn : 3600}, (err, token) => {
                            res.json({ success : true, token : 'Bearer ' + token})
                        })

                    } else {
                        return res.status(400).json({ password : 'Parola introdusa nu este corecta'})
                    }
                })
        })
})


router.get('/curent', passport.authenticate('jwt', { session : false}), (req, res) => {
    res.json({
         id : req.user.id,
         nume : req.user.nume,
         prenume : req.user.prenume,
         mail : req.user.mail
    })
})



/// DE AICI SUNT ACTUALE DIN ANDROID



router.get('/', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let profesor = await Profesor.findAll()
        res.status(200).json(profesor)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})


router.get('/:id', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let profesor = await Profesor.findById(req.params.id)
        res.status(200).json(profesor)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})


router.get('/', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let profesor = await Profesor.findAll(
            { where:{utilizator: req.query.utilizator}})
        res.status(200).json(profesor)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.put('/:id', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try{
        let profesor = await Profesor.findById(req.params.id)
        if (profesor) {
            await profesor.update(req.body)
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

router.get('/', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let profesor = await Student.findAll(
            { where:{utilizator: req.query.utilizator, parola: req.query.parola}})
        res.status(200).json(profesor)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

module.exports = router