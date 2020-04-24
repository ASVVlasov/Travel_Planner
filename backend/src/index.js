
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://gt_root:greenteam@cluster0-jubqy.azure.mongodb.net/test?retryWrites=true&w=majority', {
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
app.use(express.urlencoded({ extended: true }));

const router = require(path.resolve(__dirname, '.', 'routes'));

app.use(router);

app.listen(3000, () => {
    console.log('server has been started');
});
