const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const app = express();

mongoose
    .connect('mongodb+srv://nibri10:97728059@cluster0-hwy2g.mongodb.net/test?retryWrites=true&w=majority',{
        useUnifiedTopology: true,
        useNewUrlParser: true
})
    .then(()=>console.log('MongoDb Connect'))
    .catch(err=> console.log(err));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api', indexRouter);


module.exports = app;
