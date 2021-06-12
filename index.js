const express = require('express');
const path  = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();


// database connection

mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(()=>{
    console.log("Mongodbga online ulandik");
})
.catch((err)=>{
    console.log(err);
})
// my app

const app = express();

// global middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// view engine
app.set('views', path.join(__dirname, "clients"));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
});

// app routes
const medicineRouter = require('./routes/medicine');
const tagRouter = require('./routes/tag');
const categoryRouter = require('./routes/category');

app.use('/medicine', medicineRouter);
app.use('/tag', tagRouter);
app.use('/category', categoryRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server is working");
})