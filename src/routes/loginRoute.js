const { Router } = require('express')
const { loginIndexController, loginRegisterController, loginController, logoutController } = require('../controllers/loginController')

const route = Router()

route.get('/login/index',  loginIndexController)

route.post('/login/register', loginRegisterController)

route.post('/login/login', loginController)

route.get('/login/logout', logoutController)

module.exports = route
  