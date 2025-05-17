import 'core-js'
import 'regenerator-runtime'

import Login from './modules/Login.mjs'

const login = new Login('.form-login')
login.init()

console.log("Hello World")