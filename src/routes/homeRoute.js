const { Router } = require('express')
const { home } = require('../controllers/homeController')

const route = Router()

route.get('/', home)

module.exports = route
