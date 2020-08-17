const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 8000;


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body)
    mydata.save().then(() => {
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>saved</title>
            <style>
                h1{
            text-align: center;
            margin: 12px 0px;
            font-size: 60px;
        
        }
                .btn{
            font-size: 18px;
            padding: 8px 16px;
            border-radius: 10px;
            border: 2px solid black;
            background-color: rgb(112, 9, 9);
            display: block;
            margin: 10px;
            outline: none;
            cursor: pointer;
            margin: auto;
        }
        a{
            text-decoration: none;
            color: white;
            font-weight: bold;
        
        }
            </style>
        </head>
        <body>
            <h1>This item has been saved to the database.</h1>
            <button class="btn"><a href="/">Return Home</a></button>
            
        </body>
        </html>`)
    }).catch(() => {
        res.status(400).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>saved</title>
    <style>
        h1{
    text-align: center;
    margin: 12px 0px;
    font-size: 60px;

}
        .btn{
    font-size: 18px;
    padding: 8px 16px;
    border-radius: 10px;
    border: 2px solid black;
    background-color: rgb(112, 9, 9);
    display: block;
    margin: 10px;
    outline: none;
    cursor: pointer;
    margin: auto;
}
a{
    text-decoration: none;
    color: white;
    font-weight: bold;

}
    </style>
</head>
<body>
    <h1>This item wasn't saved to the database.</h1>
    <button class="btn"><a href="/">Return Home</a></button>
    
</body>
</html>`)
    })
})
// res.status(200).render('contact.pug');


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});




