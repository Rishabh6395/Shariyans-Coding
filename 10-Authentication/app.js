const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// kjasfdj - password
// $2b$10$HVpdnCGIFWwg.5at/yJnsOdVkTHeVa08mKFW.MLKssNH0MLK0paoa - hash

// 

app.use(cookieParser())

app.get('/', (req, res) =>{
    let token = jwt.sign({email: 'rishabh@example.com'}, "secret")
    res.cookie("token", token)
    res.send("done!")   
})

// app.get('/read', (req, res) =>{
//     console.log(req.cookies.token)
//     res.send("ho gya")
// })

app.get('/read', (req, res) =>{
    let data = jwt.verify(req.cookies.token, "secret")
    console.log(data)
    res.send("Done")
})

app.listen(3000)