const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/new', (req, res) => {
    const { name, date, amount, categoryId } = req.body
    return Record.create({ name, date, amount, categoryId, userId })
        .then(() => redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router