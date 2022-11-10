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
    req.flash('success_msg', '您已成功登出!')
    res.redirect('/users/login')
})

router.get('/register', (req, res) => {
    return res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: 'Every Field is required!' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: 'Password & confirmPassword is different!' })
    }
    if (errors.length) {
        return res.render('register', {
            errors, name, email, password, confirmPassword
        })
    }
    User.findOne({ email }).then(user => {
        if (user) {
            errors.push({ message: 'This email had been registered.' })
            return res.render('register', {
                errors, name, email, password, confirmPassword
            })
        } else {
            return User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
                .then(() => { res.redirect('/') })
                .catch(err => console.log(err))
        }

    })
        .catch(err => console.log(err))
})


module.exports = router