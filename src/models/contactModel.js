const mongoose = require('mongoose')
const validator = require("validator")

const contactSchema = new mongoose.Schema({
    name: { type : String, required: true},
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telephone: { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now}
})

const contactModel = mongoose.model('contact', contactSchema)

class Contact {
    constructor(body){
        this.body = body
        this.errors = []
        this.contact = null
    }

    async register(){
        this.valid()
        if (this.errors.length > 0) return
        this.contact = await contactModel.create(this.body)
    }
 
    valid(){ 
        this.cleanUp()

        if (this.body.email) { 
            if (!validator.isEmail(this.body.email)) {
                this.errors.push("Este é um e-mail inválido")
            }
        }
        if(!this.body.name){
            this.errors.push("Nome é um campo obrigatório")
        }
        if(!this.body.telephone && !this.body.email){
            this.errors.push("Pelo menos uma forma de contato deve ser preenchida")
        }
    }

    cleanUp(){
        for (const key in this.body) {
            if (typeof this.body[key] != "string") {
                this.body[key] = " "
            }
        }

        this.body = {
            name: this.body.name,
            surname: this.body.surname,
            email: this.body.email,
            telephone: this.body.telephone
        }
    }

    async edit(id){
        if(typeof id != 'string') return
        this.valid()
        if(this.errors.length > 0) return 
        this.contact = await contactModel.findByIdAndUpdate(_id, this.body, { new: true})
    }

    static async searchdById(id){
        if(typeof id != 'string') return
        const contact = await contactModel.findById(id)
        return contact
    }

    static async searchContacts(){
        const contacts = await contactModel.find().sort({ createdIn: -1})
        return contacts
    }

    static async deleteContact(id){
        if(typeof id != 'string') return
        const contact = await contactModel.findOneAndDelete({_id: id})
        return contact
    }
}


module.exports = { Contact }

