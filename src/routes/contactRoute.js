const { Router } = require('express')
const { loginRequiredMiddleware } = require('../middlewares/loginRequiredMiddleware')
const { contactIndexController, contactRegisterController, contactIndexIdController, contactEditIdController, contactDeleteIdController } = require('../controllers/contactController')

const route = Router()

route.get('/contact/index', loginRequiredMiddleware, contactIndexController)

route.post('/contact/register', loginRequiredMiddleware, contactRegisterController)

route.get('/contact/index/:id', loginRequiredMiddleware, contactIndexIdController)

route.post('/contact/edit/:id', loginRequiredMiddleware, contactEditIdController)

route.get('/contact/delete/:id', loginRequiredMiddleware, contactDeleteIdController)

module.exports = route
