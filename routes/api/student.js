const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


let validTokens = []

//Load Input Validation
const validateRegisterInput = require('../../validation/register')

const Student = require('../../models/Student')

router.post('/inregistrare',(req, res) => {
    const { errors, isValid} = validateRegisterInput(req.body)

    // validare
   // if(!isValid) {
    //    return res.status(400).json(errors)
   // }

    Student.findOne({ where:{utilizator: req.body.utilizator}}).then(studentNou => {
        if (studentNou) {
            errors.utilizator = 'Acest utilizator exista deja'
            return res.status(400).json(errors)
        }

        if (!studentNou) {

            studentNou = new Student({
                nume: req.body.nume,
                prenume: req.body.prenume,
                parola: req.body.parola,
                utilizator: req.body.utilizator,
                mail: req.body.mail
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(studentNou.parola, salt, (err, hash) => {
                if (err)
                    throw err
                studentNou.parola = hash
                studentNou.save()
                    .then(student => res.json(student))
                    .catch((err) => console.log(err))
            })
        })
    })
})


router.post('/login', (req, res) => {

    const mail = req.body.mail
    const parola = req.body.parola

    // gaseste user dupa mail
    Student.findOne({ where:{mail: mail}})
        .then(student => {


            // verificare
            if (!student) {
                return res.status(404).json({mail : 'Utilizatorul introdus nu exista'})
            }

            if (validTokens.some(entry => entry.mail === mail)) {
                activeToken = validTokens.filter(entry => entry.mail === mail).token
                jwt.verify(activeToken, keys.secretOrKey, (err, decoded) => {
                    if (err) {
                        return res.status(403).json({message : 'Esti deja logat!'})
                    }
                });
            }

            //verifica parola
            bcrypt.compare(parola, student.parola)
                .then(isMatch => {
                    if (isMatch) {
                        // parola e ok

                        const payload = { id: student.id,
                            nume: student.nume, prenume: student.prenume, profesor: false} // creaza jwt payload

                        // semnare token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn : 3600}, (err, token) => {
                            validTokens.push({mail, token})
                            res.json({ success : true, token : 'Bearer ' + token, mail: student.mail, student: student.mail.includes("@stud.ase.ro")})
                        })

                    } else {
                        return res.status(400).json({ parola : 'Parola introdusa nu este corecta'})
                    }
                })
        })
})




router.post('/logout', passport.authenticate('jwt', { session : false}), (req, res) => {
    if (validTokens.some(entry => entry.mail === req.body.mail)){

        validTokens = validTokens.filter(entry => entry.mail !== req.body.mail)

        res.json({
            mail: 'Te-ai deconectat cu succes'
        })
    }
    else {
        res.json({
            mail: 'Nu esti logat'
        })
    }
})


router.get('/curent', passport.authenticate('jwt', { session : false}), (req, res) => {
    res.json({
        id: req.user.id,
        nume : req.user.nume,
        prenume : req.user.prenume,
        mail : req.user.mail
    })
})



/// DE AICI SUNT METODELE DIN ANDROID



router.get('/:id',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        let student = await Student.findById(req.params.id)
        res.status(200).json(student)
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/',  passport.authenticate('jwt', { session : false}),async (req, res) => {
    try {
        let student = await Student.findAll(
            { where:{utilizator: req.query.utilizator, parola: req.query.parola}})
        res.status(200).json(student)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})

router.post('/', passport.authenticate('jwt', { session : false}),async (req, res) => {
    try{
        if (req.query.bulk && req.query.bulk == 'on'){
            await Student.bulkCreate(req.body)
            res.status(201).json({message : 'created'})
        }
        else{
            await Student.create(req.body)
            res.status(201).json({message : 'created'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/', passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {
        let student = await Student.findAll(
            { where:{utilizator: req.query.utilizator}})
        res.status(200).json(student)
    }  catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }

})



module.exports = router

