const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/new', (req, res) => {
    const { name, date, amount, categoryId } = req.body
    const userId = req.user._id
    return Record.create({ name, date, amount, categoryId, userId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router