const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Users_ = require('../models/Users_')
var basicAuth = require("express-basic-auth")
var fs = require('fs');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.PATH_FILE);
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    if(file.mimetype === 'image/json') {
      filetype = 'json';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({storage: storage});



users.post('/upload',upload.single('file'),function(req, res, next) {
  console.log(req.file);
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({ fileUrl: 'http://localhost:5000/tempo/' + req.file.filename });
})

users.use(cors())

process.env.SECRET_KEY = 'secret'

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.ID)
    const passwordMatches = basicAuth.safeCompare(password, process.env.MDP)
 
    return userMatches & passwordMatches
}

users.post('/login'/*,ipfilter(ips, {detectIp: customDetection, mode:"deny"})*/,basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  Users_.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(users_ => {
      if (users_) {
        if (bcrypt.compareSync(req.body.password, users_.password)) {
          let token = jwt.sign(users_.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1800
          })
          res.send(token)
        }
        else{
        	res.status(401).json({ error: 'Password does not exist' })
        }
    	}
       else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})
module.exports = users
