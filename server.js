'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const cors = require('cors')

const database = require('./routes/database/database')
// const teachers = require('./routes/api/profesor')
// const students = require('./routes/api/student')
//
// const questions = require('./routes/api/intrebareGrila')



const echipa = require('./routes/api/echipa')
const evidentaIntrebariTeste = require('./routes/api/evidentaIntrebariTeste')
const evidentaMateriiProfesori = require('./routes/api/evidentaMateriiProfesori')
const evidentaStudentiEchipe = require('./routes/api/evidentaStudentiEchipe')
const intrebareGrila = require('./routes/api/intrebareGrila')
const materie = require('./routes/api/materie')
const profesor = require('./routes/api/profesor')
const raspunsIntrebareGrila = require('./routes/api/raspunsIntrebareGrila')
const rezultatTestStudent = require('./routes/api/rezultatTestStudent')
const student = require('./routes/api/student')
const test = require('./routes/api/test')
const testPartajat = require('./routes/api/testPartajat')
const testSustinut = require('./routes/api/testSustinut')
const variantaRaspuns = require('./routes/api/variantaRaspuns')
//const results = require('./routes/api/results')

require('./models/tabeleLegatura')()

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

// Passport middleware

app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Use Routes
 app.use('/database', database)
// app.use('/api/teachers', teachers)
// app.use('/api/students', students)
// //app.use('/api/tests', tests)
// app.use('/api/questions', questions)
//

app.use('/api/echipe', echipa)
app.use('/api/evidentaIntrebariTeste', evidentaIntrebariTeste)
app.use('/api/evidentaMateriiProfesori', evidentaMateriiProfesori)
app.use('/api/evidentaStudentiEchipe', evidentaStudentiEchipe)
app.use('/api/intrebariGrila', intrebareGrila)
app.use('/api/materii', materie)
app.use('/api/profesori', profesor)
app.use('/api/raspunsuriIntrebariGrila', raspunsIntrebareGrila)
app.use('/api/rezultateTesteStudent', rezultatTestStudent)
app.use('/api/studenti', student)
app.use('/api/teste', test)
app.use('/api/testePartajate', testPartajat)
app.use('/api/testeSustinute', testSustinut)
app.use('/api/varianteRaspuns', variantaRaspuns)


const port = process.env.PORT || 8080


app.listen(port, () => console.log(`Server running on port ${port}`))