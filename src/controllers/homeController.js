const { Contact } = require('../models/contactModel')

async function home(req, res) {
    try{
        const contacts = await Contact.searchContacts()
        res.render('home', {
            contacts
        })
    } catch(e) {
        res.render('error')
    }
}



module.exports =  { home }
 