const express = require('express')
const path = require('path')
require('dotenv').config()
const session = require('express-session')
const flash = require('connect-flash')
const mustache = require('mustache-express')
const mongoose = require('mongoose')
mongoose.connect(process.env.URLMONGO)
.then(() => {
console.log("Entrou")
server.emit('pronto')
})
.catch((e) => {
    console.log(e)
})

const MongoStore = require('connect-mongo')
const csrf = require('csurf')
const { checkCsurfError, csurfToken } = require('./middlewares/csurfMiddleware')
const { flashMessagesMiddleware} = require('./middlewares/flashMessagesMiddleware')
const { userSessionMiddleware } = require('./middlewares/userSessionMiddleware')
const homeRoute = require('./routes/homeRoute')
const loginRoute = require('./routes/loginRoute')
const contactRoute = require('./routes/contactRoute')

const server = express()

server.use(express.urlencoded({extended: true}))

server.use(express.json())

server.use(express.static(path.join(__dirname, '../public')))

const sessionOptions = session({
   secret: process.env.URLMONGO,
   store: MongoStore.create({ mongoUrl: process.env.URLMONGO }),
   resave: false,
   saveUninitialized: false,
   cookie: {
     maxAge: 1000 * 60 * 60 * 24 * 7,
     httpOnly: true
   }
});
server.use(sessionOptions)

server.use(flash())

server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, './views'))
server.engine('mustache', mustache())

server.use(csrf()) 
//Próprios Middlewares

server.use(csurfToken)
server.use(checkCsurfError)
server.use(flashMessagesMiddleware)
server.use(userSessionMiddleware)
server.use(homeRoute)
server.use(loginRoute)
server.use(contactRoute)

server.use((req, res) => {
    res.status(404).render('error')
})

server.on('pronto', () => {
    server.listen(3001, () => {
        console.log('Acessar http://localhost:3001');
        console.log('Servidor executando na porta 3000');
    })
})


