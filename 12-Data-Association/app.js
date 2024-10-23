const express = require('express');
const app = express()
const usreModel = require('./models/user')
const postModel = require('./models/posts')

app.get('/', (req, res)=>{
    res.send("Hey There")
})

app.get('/create', async (req, res)=>{
    let user = await usreModel.create({
        username: 'rishabh',
        age: 22,
        email: 'rishabh@gmail.com'
    })
    res.send(user)
})

app.get('/post/create', async (req, res)=>{
    let post = await postModel.create({
        postdata: 'Hello Kese Ho',
        user: '671842ca3fc57c04ea0232c3'
    })

    let user = await usreModel.findOne({_id: '671842ca3fc57c04ea0232c3'})
    user.posts.push(post._id)
    await user.save()

    res.send({post, user})
})

app.listen(3000)