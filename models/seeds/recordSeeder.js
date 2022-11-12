const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
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
        categoryId: 3
    },
    {
        name: "油錢",
        date: Date.now(),
        amount: 125,
        categoryId: 1
    },
    {
        name: "戰鬥陀螺",
        date: Date.now(),
        amount: 500,
        categoryId: 2
    },
    {
        name: "房貸",
        date: Date.now(),
        amount: 25000,
        categoryId: 0
    }
]

db.once('open', () => {
    Promise
        .all(
            SEED_USER.map(user => {
                const { name, email, password, recordIndex } = user
                return User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
                    .then((user) => {
                        const userId = user._id
                        const records = recordIndex.map(index => {
                            //return record
                            const record = ({ ...SEED_RECORD[index], userId })
                            return record
                        })
                        return Record.create(records)
                    })
                    .catch(err => console.log(err))
            })
        )
        .then(() => {
            console.log('records done!')
            process.exit()
        })
        .catch(err => console.log(err))
        .finally(() => db.close)
})

//這部分程式碼研究中
/*db.once('open', async () => {
    try {
        await Promise.all(
            SEED_USER.map(async user => {
                //prepare userId
                const { name, email, password, recordIndex } = user
                const createdUser = await User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
                const userId = createdUser._id

                const records = recordIndex.map(async index => {
                    //return record
                    const record = ({ ...SEED_RECORD[index], userId })
                    return record
                })
                console.log(records)
                return Record.create(records)
            })
        )
        console.log('Seed created!')
        process.exit()
    }
    catch (err) {
        console.log(err)
        db.close
    }
    return resolve()
})*/
