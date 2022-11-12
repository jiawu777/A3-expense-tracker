const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')
//const categorySelect = document.querySelector('#category-selector')


router.get('/', (req, res) => {
    const userId = req.user._id
    /*categorySelect.addEventListener('click', function categorySelector(event) {
        event.preventDefault()
        const target = event.target
        console.log(target)
        const categoryId = 'all'
        switch (target) {
            case '0':
                return categoryId = 0
                break;
            case '1':
                return categoryId = 1
                break;
            case '2':
                return categoryId = 2
                break;
            case '3':
                return categoryId = 3
                break;
            case '4':
                return categoryId = 4
                break;
        }
    })*/
    Record.find({ userId })
        .lean()
        .then(records => res.render('index', { records }))
        .catch(err => console.log(err))
})

module.exports = router