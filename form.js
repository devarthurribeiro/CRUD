const { Console } = require('console');
const express = require('express');
const app = express();
const port = 8081;
const mongoose = require('mongoose');
var h = new Date().toLocaleString();
var path = require('path');

// Sending the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})
app.use(express.static(__dirname + '/public'));

// Mongoose Setting
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('Connected with Mongoose')
}).on('error', (error) => {
    console.log('Theres an error: ', error)
})

var userSchema = new mongoose.Schema({
    name: String,
    ecivil: String,
    age: Number,
    cpf: Number,
    city: String,
    uf: String
})

var newUser = mongoose.model('newUser', userSchema);


// Parsing data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// POST Treatment
app.post('/form', (req, res) => {
    new newUser({
        name: req.body.user_name,
        ecivil: req.body.user_mstatus,
        age: req.body.user_age,
        cpf: req.body.user_cpf,
        city: req.body.user_city,
        uf: req.body.user_uf
    }).save(function(err, newUser){
      if(err) console.error(err);
      else res.send('Cadastro realizado com sucesso!')
    })
})






// Server check
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port + ' às ' + h);
})

