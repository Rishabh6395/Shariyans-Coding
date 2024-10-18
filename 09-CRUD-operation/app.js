const express = require('express')
const app = express()
const path = require("path")
const userModel = require('./models/user')

app.set('view engine', "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req,res) => {
    res.render("index")
})
app.get('/read', async (req,res) => {
    let users = await userModel.find()
    res.render("read", {users})
})
// Route for rendering the edit form
app.get('/edit/:id', async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.id }); // Use req.params.id here
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render("edit", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for handling form submission and updating the user
app.post('/update/:id', async (req, res) => { // Change to req.params.id
    try {
        let { name, email, image } = req.body;
        let user = await userModel.findOneAndUpdate(
            { _id: req.params.id }, // Use req.params.id here
            { name, email, image },
            { new: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.redirect("/read");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/create', (req,res) => {
    res.render("nice")
})
app.get('/delete/:id', async(req,res) => {
    let users = await userModel.findByIdAndDelete({_id: req.params.id})
    res.redirect("/read")
})

app.post('/create', async (req,res) => { 
    let {name, email, image} = req.body
    let createdUser = await userModel.create({name, email, image})

    res.redirect('/read')
})

app.listen(3000)