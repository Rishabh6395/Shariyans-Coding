const express = require('express')
const router = express.Router()
const owenerModel = require('../models/owners-model')

router.get('/', function(req, res){
    res.send('hey its working')
})

if(process.env.NODE_ENV === 'development'){
    console.log("hey")

}

if(process.env.NODE_ENV === 'development'){
    router.post('/create', function(req, res){
        res.send('hey its working')
    })
}


module.exports = router