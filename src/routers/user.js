const express = require('express')
const User = require('../models/user')
const path = require('path')
const router = new express.Router()
// const Window = require('window')
const alert= require('alert-node')
const {sendWelcomeEmail,meetingSent} = require('../emails/account')
const publicDirectoryPath = path.join(__dirname, '../../public')
// const window = new Window()
console.log(publicDirectoryPath)

//create a user
router.post('/users/:username-:password-:email', (req,res)=>{
    console.log("test")
    const user = new User (req.params)
    console.log(user)
    user.save().then(()=>{
        // res.status(201).send(user)
        sendWelcomeEmail(user.email, user.username)
        res.sendFile(path.join(publicDirectoryPath, '/home-page.html'))

    }).catch((e)=>{
        res.status(400).sendFile(path.join(publicDirectoryPath, '/notfound.html'))
    })
})

//login user
router.post('/users/login/:password-:email', async (req,res,next)=>{
    console.log(req.params)

    try{
        const user = await User.findByCredentials(req.params.email, req.params.password)
        // res.send(user)
        user.save().then(()=>{
            // res.status(201).send(user)
            res.sendFile(path.join(publicDirectoryPath, '/home-page.html'))
    
        }).catch((e)=>{
            res.status(400).send(e)
        })

    }catch(e){
        res.status(400).sendFile(path.join(publicDirectoryPath, '/notfound.html'))

    }
    
})
router.get('/thank',(req,res)=>{
    meetingSent(req.query.email,req.query.date,req.query.comment,req.query.group )
    res.status(400).sendFile(path.join(publicDirectoryPath, '/thankyou.html'))

})
//get all the users
router.get('/users', (req,res)=>{
    console.log(req.body)
    User.find({}).then((users)=>{
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

//get a user by id
router.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
  
  
}).catch((e)=>{
    res.status(500).send(e)
})
})

module.exports = router