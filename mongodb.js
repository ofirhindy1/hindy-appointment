//create the databse 
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const url = "mongodb://127.0.0.1:27017"
const dbName = 'appointment-manager'

mongoClient.connect(url, {useNewUrlParser:true},(error, client)=>{
    if(error){
        return console.log(error)
    }
    const db = client.db(dbName)
    db.collection('appointment-manager').find({name:'ofir'}).toArray((error,users)=>{
        console.log(users)
    })
})