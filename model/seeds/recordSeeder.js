const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const User = require('../user')
//const Record = require('../record')
const db = require('../../config/mongoose')
const SEED_USER = {
    name: "AC",
    email: "ac@123",
    password: "123"
}

db.once('open', () => {
    const { name, email, password } = SEED_USER
    return User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
    /*.then(user => {
        return Promise.all(
            Array.from({ length: 5 }, (_, i) => Record.create({
                name: `name-${i}`,
                date: Date.now(),
                amount: `${i * 100}`,
                userId: user._id,
            }))
        )*/
})

    .then(() => {
        console.log('Record seeder done.')
        process.exit()
    })
})