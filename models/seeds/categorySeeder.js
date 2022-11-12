const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Category = require('../category')

const SEED_CATEGORY = [
    {
        name: '家居物業',
        icon: 'https://fontawesome.com/icons/home?style=solid'
    },
    {
        name: '交通出行',
        icon: "https://fontawesome.com/icons/shuttle-van?style=solid",
    },
    {
        name: '休閒娛樂',
        icon: 'https://fontawesome.com/icons/grin-beam?style=solid'
    },
    {
        name: '餐飲食品',
        icon: 'https://fontawesome.com/icons/utensils?style=solid'
    },
    {
        name: '其他',
        icon: 'https://fontawesome.com/icons/pen?style=solid'
    }
]

db.once('open', () => {
    Promise.all(
        SEED_CATEGORY.map(category => {
            const { name, icon } = category
            return Category.create({ name, icon })
        })
    )
        .then(() => {
            console.log('Category created!')
            process.exit()
        })
        .catch(err => console.log(err))
        .finally(() => db.close)
})
