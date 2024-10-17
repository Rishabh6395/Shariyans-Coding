const mongooose = require('mongoose')

mongooose.connect('mongodb://127.0.0.1:27017/testapp1')

const userSchema = mongooose.Schema({
    name: String,
    email: String,
    image: String
})

module.exports = mongooose.model('user', userSchema)