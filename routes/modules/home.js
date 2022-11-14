const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')

router.get('/', (req, res) => {
    const userId = req.user._id
    Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
            let totalAmount = 0
            for (let i = 0; i < records.length; i++) {
                totalAmount += records[i].amount
            }
            res.render('index', { records, totalAmount })
        })
        .catch(err => console.log(err))
})

router.post('/category', (req, res) => {

})

module.exports = router