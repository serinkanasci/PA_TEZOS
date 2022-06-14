const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Users_ = require('../models/Users_')
var basicAuth = require("express-basic-auth")


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
