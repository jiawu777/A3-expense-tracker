const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const User = require('../user')
const bcrypt = require('bcryptjs')


const SEED_USER = {
    name: 'AC',
    email: 'ac@123',
    password: '123'
}

db.once('open', () => {
    const { name, email, password } = SEED_USER
    return User.create({ name, email, password })
        .then(() => {
            console.log('User created!')
            process.exit()
        })
})
