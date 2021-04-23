var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let adminRouter = require('./routes/admin');

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb+srv://admin:admin@cluster0.w73yp.mongodb.net/cluster0?retryWrites=true&w=majority", {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log("Vi har kopplat upp oss mot databasen!");
    const db = client.db("newsletter");
    app.locals.db = db;
  })

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

module.exports = app;