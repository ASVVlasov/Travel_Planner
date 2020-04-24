const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('server has been started');
});
