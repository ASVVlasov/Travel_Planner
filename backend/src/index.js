
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

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
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'frontend', 'build')));

const router = require(path.resolve(__dirname, '.', 'routes'));

app.use(router);

app.listen(PORT, () => {
    console.log(`server has been started at http://localhost:${PORT}`);
});
