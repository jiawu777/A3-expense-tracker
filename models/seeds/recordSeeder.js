const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const User = require('../user')
const Record = require('../record')
const bcrypt = require('bcryptjs')


const SEED_USER = [
    {
        name: '廣志',
        email: 'ac@123',
        password: '123',
        recordIndex: [1, 3]
    },
    {
        name: '小新',
        email: 'aa@456',
        password: '456',
        recordIndex: [0, 2]
    }
]



const SEED_RECORD = [
    {
        name: "早餐",
        date: Date.now(),
        amount: 100,
        categoryIndex: 3
    },
    {
        name: "油錢",
        date: Date.now(),
        amount: 125,
        categoryIndex: 1
    },
    {
        name: "戰鬥陀螺",
        date: Date.now(),
        amount: 500,
        categoryIndex: 2
    },
    {
        name: "房貸",
        date: Date.now(),
        amount: 25000,
        categoryIndex: 0
    }
]

db.once('open', () => {
    Promise.all(
        SEED_USER.map(user => {
            const { name, email, password, recordIndex } = user
            return User.create({
                name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
            })
                .then(user => {
                    const userId = user._id
                    const records = recordIndex.map(index => {
                        const record = ({ ...SEED_RECORD[index], userId })
                        return record
                    })
                    return Record.create(records)
                })
        })
    )
        .then(() => {
            console.log('Seed created!')
            process.exit()
        })
        .catch(err => console.log(err))
        .finally(() => db.close)
})
