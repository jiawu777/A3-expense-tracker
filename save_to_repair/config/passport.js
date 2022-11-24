const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {

    //passport initialize
    app.use(passport.initialize())
    app.use(passport.session())

    //set local strategy
    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: 'true' }, (req, email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'The email is not register.' })
                }
                return bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) { return done(null, false, { message: 'Email or Password incorrect.' }) }
                        return done(null, user)
                    })
            })
            .catch(err => done(err, false))
    }))

    //set serialize & deserialize
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null))
    })
}