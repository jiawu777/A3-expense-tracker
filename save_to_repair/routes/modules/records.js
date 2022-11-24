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

router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Promise.all([Record.findOne({ _id, userId })])
        .lean()
        .then((record) => res.render('edit', { record }))
        .catch(err => { console.log(err) })
})

router.put('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const { name, date, amount, categoryId } = req.body
    return Record.findOne({ _id, userId })
        .then((record) => {
            record.name = name
            record.date = date
            record.amount = amount
            record.categoryId = categoryId
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => { console.log(err) })
})

router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(err => { console.log(err) })

})

module.exports = router