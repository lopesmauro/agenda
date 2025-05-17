const { Contact, searchdById } = require('../models/contactModel') 

function contactIndexController(req, res){
    res.render('contact', {
        contact: {}
    })
}

async function contactRegisterController(req, res){
    try{
        const contact = new Contact(req.body)
        await contact.register()
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return 
        } 
        req.flash('success', 'Contato registrado com sucesso')
        req.session.save(() => {
            return res.redirect(`/contact/index/${contact.contact._id}`)
        }) 
    } catch(e) {
        return res.render('error')
    }
}

async function contactIndexIdController(req, res){
    if(!req.params.id) return res.render('error')
    try{
        const contact = await Contact.searchdById(req.params.id)
        if(!contact) return res.render('error')
        res.render('contact', { contact })
    } catch(e){
        res.render('error')
    }
}   

async function contactEditIdController (req, res) {
    if(!req.params.id) return res.render('error')
    try{
        const contact = new Contact(req.body)
        await contact.edit(req.params.id)
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return 
        } 
        req.flash('success', 'Contato editado com sucesso')
        req.session.save(() => {
            return res.redirect(`/contact/index/${contact.contact._id}`)
        }) 
    } catch(e){
        res.render('error')
    }
}

async function contactDeleteIdController(req, res){
    if(!req.params.id) return res.render('error')
    try{
        const contact = await Contact.deleteContact(req.params.id)
        if(!contact) return res.render('error')
        req.flash('success', 'Contato excluído com sucesso')
        req.session.save(() => {
            return res.redirect('/')
        }) 
    } catch(e){
        res.render('error')
    }
}

module.exports = {contactIndexController, contactRegisterController, contactIndexIdController, contactEditIdController, contactDeleteIdController}   