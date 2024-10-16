const express = require('express')
const app = express()

const userModel = require('./usermodel')

app.get('/', (req, res) => {
    res.send("Hello World")
})

// app.get('/create', async (req, res) => {
//     let createuser = await userModel.create({
//         name: 'rishabh',
//         email: 'rishabh@gmail.com',
//         username: 'rishabhhh'
//     })
//     res.send(createuser)
// })
app.get('/create', async (req, res) => {
    let createuser = await userModel.create({
        name: 'aviral',
        email: 'aviral@gmail.com',
        username: 'aviralbuisness'
    })
    res.send(createuser)
})

app.get('/update', async (req, res) => {
    
    let updateduser = await userModel.findOneAndUpdate({username: "rishabhhh"}, {name: 'rishabh bhatt'}, {new: true})

    res.send(updateduser)
})

app.get('/read', async (req,res) => {
    let users = await userModel.find({username:'rishabhhh'})
    res.send(users)
})

app.delete('/del', async (req,res)=>{
    let userdelete = await userModel.findOneAndDelete({username:'rishabhhh'})
    res.send(userdelete)
})

app.listen(3000)