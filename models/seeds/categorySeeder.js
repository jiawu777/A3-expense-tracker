if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const SEED_CATEGORY = [
    {
        name: '家居物業',
        icon: 'https://fontawesome.com/icons/home?style=solid',
        categoryId: 0
    },
    {
        name: '交通出行',
        icon: "https://fontawesome.com/icons/shuttle-van?style=solid",
        categoryId: 1
    },
    {
        name: '休閒娛樂',
        icon: 'https://fontawesome.com/icons/grin-beam?style=solid',
        categoryId: 2
    },
    {
        name: '餐飲食品',
        icon: 'https://fontawesome.com/icons/utensils?style=solid',
        categoryId: 3
    },
    {
        name: '其他',
        icon: 'https://fontawesome.com/icons/pen?style=solid',
        categoryId: 4
    }
]

db.once('open', () => {
    Promise.all(
        SEED_CATEGORY.map(category => {
            const { name, icon, categoryId } = category
            return Category.create({ name, icon, categoryId })
        })
    )
        .then(() => {
            console.log('Category created!')
            process.exit()
        })
        .catch(err => console.log(err))
        .finally(() => db.close())
})
