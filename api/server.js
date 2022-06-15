var express = require('express');
var cors = require('cors');
const rateLimit = require("express-rate-limit");
var bodyParser = require('body-parser');
var xss = require('xss-clean');
var app = express();
var helmet = require('helmet');
var port = process.env.PORT || 5000;

require('dotenv').config({path:'.env'});

app.use(helmet());

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(express.json({ limit: '10kb' }));

var Users = require('./routes/Users');

const limit = rateLimit({
    max: 5,
    windowMs: 5 * 60 * 1000, 
    message: 'Too many requests please wait 5 minutes'
});
app.use('/users/login', limit);
app.use('/users/login_agent', limit);

app.use('/users', Users);

app.use(xss());

app.listen(port, function() {
  console.log('Server is running on port: ' + port);
});
