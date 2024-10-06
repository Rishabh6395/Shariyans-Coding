const express = require('express');
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function(req, res, next){
    console.log("Middle ware chla")
    next()
})
app.use(function(req, res, next){
    console.log("Middle ware chla ek bar or")
    next()
})

// routes
app.get('/', function(req, res){
    res.send("Hello World");    
})
app.get('/profile', function(req, res, next){
    return next(new Error("Something went wrong"))   
})

app.use(function(err, req, res, next){
    console.log(err.stack)
    res.status(500).send("Something Broke :(")
    
})

app.listen(3000)