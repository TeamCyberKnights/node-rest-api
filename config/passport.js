const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Sequelize = require('sequelize')

const Student = require('../models/Student')
const Profesor = require('../models/Profesor')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = (passport)  =>  {
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        if (jwtPayload.profesor==true) {
            Profesor.findOne({where: {id: jwtPayload.id}})
                .then(profesor => {
                    if (profesor) {
                        return done(null, profesor)
                    }
                })
                .catch(err => console.log(err))
        }
        else if (jwtPayload.profesor==false) {
            Student.findOne({ where:{id: jwtPayload.id}})
                .then(student => {
                    if (student) {
                        console.log(student)
                        return done(null, student)
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            return done(null, false)
        }
    }))
}

