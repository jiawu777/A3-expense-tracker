const express = require('express')
const router = express.Router()

const records = require('./modules/records')
const users = require('./modules/users')
const home = require('./modules/home')

router.use('/records', records)
router.use('/users', users)
router.use('/', home)

module.exports = router