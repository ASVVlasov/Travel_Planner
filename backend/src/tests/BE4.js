const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Traveler = require("../controllers/traveler.js")

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.connection.on('error', () => {
    console.log('error connection');
});
mongoose.connection.once('open', () => {
    console.log('DB connected');
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/create', (req, res) => {
    req.body.login = "Vasya"
    req.body.password = "password"
    req.body.mail = "example@mail.ru"
    Traveler.create(req, res)
});
app.get('/read_empty', (req, res) => {
    Traveler.read(req, res)
})
app.get('/read_wrong', (req, res) => {
    req.body._id = "11111"
    Traveler.read(req, res)
})
app.get('/read', (req, res) => {
    req.body._id = mongoose.Types.ObjectId("5ea44edd700f73350430d726")
    Traveler.read(req, res)
})

app.get('/update_empty', (req, res) => {
    Traveler.update(req, res)
})

app.get('/update_wrong', (req, res) => {
    req.body._id = mongoose.Types.ObjectId("5ea44edd700f733504311111")
    Traveler.update(req, res)
})

app.get('/update_nothing', (req, res) => {
    req.body._id = mongoose.Types.ObjectId("5ea44edd700f73350430d726")
    Traveler.update(req, res)
})

app.get('/update', (req, res) => {
    req.body._id = mongoose.Types.ObjectId("5ea44edd700f73350430d726")
    req.body.login = "Foo Bar"
    Traveler.update(req, res)
})




app.listen(3404, () => {
    console.log('server has been started');
});