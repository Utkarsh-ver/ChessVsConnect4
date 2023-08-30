const express = require('express');
const mongoose = require('mongoose');
const User = require('./userData');
const { handleUserLogin } = require('./sign');
const app = express();


const dbURI = 'mongodb+srv://shubhkj275:skumarj275@nodetuts.dp8genc.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');


app.get('/', (req,res) => {
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', (req, res) => {
    roll = req.body.roll;
    pwd = req.body.pwd;
    handleUserLogin(req, res);
});



// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
