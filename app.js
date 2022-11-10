const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
//const { Authenticator } = require('./middleware/auth')

const PORT = process.env.PORT || 3000
const app = express()
const usePassport = require('./config/passport')
if (process.nextTick.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const routes = require('./routes')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
require('./config/mongoose')

//set static files
app.use(express.static('public'))

//set body-parser
app.use(express.urlencoded({ extended: true }))

//set session 
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

//use Passport
usePassport(app)

//use flash
app.use(flash())

//turn flash message to locals
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    res.locals.error = req.flash('error')
    next()
})

//use routes
app.use(routes)
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})