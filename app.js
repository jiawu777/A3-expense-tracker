const express = require('express')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000
const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


//setting static files
app.use(express.static('public'))

//setting body-parser
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})