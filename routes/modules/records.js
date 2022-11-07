const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/new', (req, res) => {
    const { name, date, amount, category } = req.body
    return Record.create({ name, date, amount, category, userId })
        .then(() => redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router