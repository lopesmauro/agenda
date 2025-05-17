const { Login } = require("../models/loginModel")

function loginIndexController(req, res) {
    if(req.session.user) return res.render('logged')
    return res.render('login')
}

async function loginRegisterController(req, res) {
    try{
        const login = new Login(req.body)
        await login.register()
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return
        }
        req.flash('success', 'Seu usuário foi criado com sucesso.')
        req.session.user = login.user
        req.session.save(() =>  {
            return res.redirect('back')
        })
    }
    catch(err){
        console.log(err)
        res.render('error')
    }
}

async function loginController (req, res) {
    try{
        const login = new Login(req.body)
        await login.login()
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return 
        }
        req.flash('success', 'Login realizado com sucesso.')
        req.session.user = login.user
        req.session.save(() =>{
            return res.redirect('back')
        })
    }
    catch(err){
        console.log(err)
        res.render('error')
    }
}

function logoutController(req, res){
    req.session.destroy()
    res.redirect('/')
}

module.exports = { loginIndexController, loginRegisterController, loginController, logoutController }
