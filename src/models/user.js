const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        trim:true,
        unique:true,
        minlength:3
        },
        email:{
            type:String,
            // required:true,
            trim:true,
            // unique:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid!')
                }
            }
        },
    password: {
        type: String,
        required:true,
        trim:true,
        minlength:6
        }
})

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    
    if(!user){
        throw new Error('Unable to login')
        console.log("bot")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error ('Unable to login')
    }
    return user
}

//hash the password 
userSchema.pre('save', async function(next){
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
// userSchema.post('/users/login/:password-:email',async function(next){
//     window.location.href(publicDirectoryPath+"/home-page.html")
//     console.log("2")
//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports= User