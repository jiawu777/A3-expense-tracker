const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
    return res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})

router.get('/register', (req, res) => {
    return res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
        console.log('Every Field is required!')
        return res.render('register', { name, email, password, confirmPassword })
    }
    if (password !== confirmPassword) {
        console.log('Password & confirmPassword is different!')
        return res.render('register', { name, email, password, confirmPassword })
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                console.log('User exists.')
                return res.render('register', { name, email, password, confirmPassword })
            } else {
                return User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
                    .then(() => { res.redirect('/') })
                    .catch(err => console.log(err))
            }

        })
        .catch(err => console.log(err))
    //待寫flash
})


module.exports = router