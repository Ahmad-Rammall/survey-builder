const express = require('express');
require('dotenv').config()
const {connectToMongoDB} = require('./configs/mongoDb.configs');

const app = express();


app.listen(process.env.PORT, () => {
    connectToMongoDB();
})