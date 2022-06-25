const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var basicAuth = require("express-basic-auth")
const User = require('../models/User')
const FinancingPlan = require('../models/FinancingPlan')
const Nft = require('../models/Nft')
const Etps = require('../models/Etps')
var fs = require('fs');

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "D:/tempo/");
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
      if(file.mimetype === 'application/json') {
        filetype = 'json';
      }
      cb(null, file.originalname+'-'+ Date.now() + '.' + filetype);
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

// User 



users.get('/profile', (req, res) => {
  let bearer = req.headers['authorization'];
  if(bearer.startsWith('Bearer ')){
      let test = bearer.replace('Bearer ','');
      var decoded = jwt.verify(test, process.env.SECRET_KEY);
  }
  else{
      var decoded = jwt.verify(bearer, process.env.SECRET_KEY);
  }

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/register',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    post_addr: req.body.post_addr,
    country: req.body.country,
    city: req.body.city,
    street_addr: req.body.street_addr,
    phone_number: req.body.phone_number,
    mail_addr: req.body.mail_addr,
    pwd: req.body.pwd,
    mensuality: req.body.mensuality,
    birth_date: req.body.birth_date,
    entreprise: req.body.entreprise,
    yearly_income: req.body.yearly_income,
    verified: req.body.verified,
    is_banned: req.body.is_banned
  }


  User.findOne({
    where: {
      mail_addr: req.body.mail_addr
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.pwd, 10, (err, hash) => {
          userData.pwd = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.mail_addr + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User with this mail address already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



users.get('/users', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  User.findAll({
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('No one')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/user/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  User.findAll({
    where: {
      mail_addr: r_id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.delete('/delete_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  var r_id = req.params.id;

  User.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})



users.put('/update_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  var check = req.params.id;
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    post_addr: req.body.post_addr,
    country: req.body.country,
    city: req.body.city,
    street_addr: req.body.street_addr,
    phone_number: req.body.phone_number,
    mail_addr: req.body.mail_addr,
    pwd: req.body.pwd,
    entreprise: req.body.entreprise,
    mensuality: req.body.mensuality,
    birth_date: req.body.birth_date,
    yearly_income: req.body.yearly_income,
    verified: req.body.verified,
    is_banned: req.body.is_banned
  }

  User.findOne({
    where: {
      id: check
    }
  })
    .then(user => {
      if (user) {
        bcrypt.hash(req.body.pwd, 10, (err, hash) => {
          user.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            post_addr: req.body.post_addr,
            country: req.body.country,
            city: req.body.city,
            street_addr: req.body.street_addr,
            phone_number: req.body.phone_number,
            mail_addr: req.body.mail_addr,
            pwd: req.body.pwd,
            entreprise: req.body.entreprise,
            mensuality: req.body.mensuality,
            birth_date: req.body.birth_date,
            yearly_income: req.body.yearly_income,
            verified: req.body.verified,
            is_banned: req.body.is_banned

        });

        res.json(user);
        })
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


  })


  users.put('/verify_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
    var check = req.params.id;
    const userData = {
      verified: req.body.verified,
    }
  
    User.findOne({
      where: {
        mail_addr: check
      }
    })
      .then(user => {
        if (user) {
          bcrypt.hash(req.body.pwd, 10, (err, hash) => {
            user.update({
              verified: req.body.verified,
  
          });
  
          res.json(user);
          })
        } else {
          res.send('User does not exist');
        }
      })
      .catch(err => {
        res.send('error: ' + err);
      })
  
  
    })


  users.put('/ban_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
    var check = req.params.id;
  
    User.findOne({
      where: {
        mail_addr: check
      }
    })
      .then(user => {
        if (user) {
          user.update({
            is_banned: req.body.is_banned

        });
        } else {
          res.send('User does not exist');
        }
      })
      .catch(err => {
        res.send('error: ' + err);
      })
  
  
    })


  users.post('/login'/*,ipfilter(ips, {detectIp: customDetection, mode:"deny"})*/,basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
    
    User.findOne({
      where: {
        mail_addr: req.body.mail_addr
      }
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.pwd, user.pwd)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
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

// Entreprises 

users.post('/createEtps',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const etpsData = {
    access_code: req.body.access_code,
    entreprise: req.body.entreprise,
    is_banned: req.body.is_banned
  }


  Etps.findOne({
    where: {
      access_code: req.body.entreprise
    }
  })
    .then(etps => {
      if (!etps) {
        Etps.create(etpsData)
          .then(etps => {
            res.json({ status: etps.entreprise + ' Registered!' })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'Entreprise already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



users.get('/etps', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  Etps.findAll({
  })
    .then(etps => {
      if (etps) {
        res.json(etps)
      } else {
        res.send('No one')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/etps/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Etps.findAll({
    where: {
      access_code: r_id
    }
  })
    .then(etps => {
      if (etps) {
        res.json(etps)
      } else {
        res.send('Entreprise does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/etpsByName/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Etps.findAll({
    where: {
      entreprise: r_id
    }
  })
    .then(etps => {
      if (etps) {
        res.json(etps)
      } else {
        res.send('Entreprise does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.delete('/delete_etps/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  var r_id = req.params.id;

  Etps.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})



users.put('/update_etps/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  var check = req.params.id;
  Etps.findOne({
    where: {
      id: check
    }
  })
    .then(etps => {
      if (etps) {
        etps.update({
          access_code: req.body.access_code,
          entreprise: req.body.entreprise,
          is_banned: req.body.is_banned

        });
        res.json(etps);
      } else {
        res.send('Entreprise does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


  })

  users.put('/ban_etps/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
    var check = req.params.id;
  
    Etps.findOne({
      where: {
        entreprise: check
      }
    })
      .then(etps => {
        if (etps) {
          etps.update({
            is_banned: req.body.is_banned
  
          });
          res.json(etps);
        } else {
          res.send('Entreprise does not exist');
        }
      })
      .catch(err => {
        res.send('error: ' + err);
      })
  
  
    })



  // Financing Plan

  users.post('/create_financing_plan',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
    const financingPlanData = {
      rate_interest: req.body.rate_interest,
      rate_insurance: req.body.rate_insurance,
      contribution: req.body.contribution,
      monthly_loan: req.body.monthly_loan,
      housing_price: req.body.housing_price,
      user_risk: req.body.user_risk,
      user_id: req.body.user_id,
      nft_id: req.body.nft_id,
      validate: req.body.validate,
      etps: req.body.etps
    }

    FinancingPlan.create(financingPlanData)
            .then(financing_plan => {
              res.json({ status: financing_plan })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
  })
  
  
  
  users.get('/financing_plans', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
    FinancingPlan.findAll({
    })
      .then(financing_plan => {
        if (financing_plan) {
          res.json(financing_plan)
        } else {
          res.send('No one')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  
  
  users.get('/financing_plan/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
    var r_id = req.params.id;
  
    FinancingPlan.findAll({
      where: {
        id: r_id
      }
    })
      .then(financing_plan => {
        if (financing_plan) {
          res.json(financing_plan)
        } else {
          res.send('Entreprise does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  
  users.delete('/delete_financing_plan/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  
    var r_id = req.params.id;
  
    FinancingPlan.destroy({where: {
        id: r_id
      }}).then(function () { res.send('Ok') });
  })
  
  
  
  users.put('/update_financing_plan/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
    var check = req.params.id;
    const financingPlanData = {
      rate_interest: req.body.rate_interest,
      rate_insurance: req.body.rate_insurance,
      contribution: req.body.contribution,
      monthly_loan: req.body.monthly_loan,
      housing_price: req.body.housing_price,
      user_risk: req.body.user_risk,
      user_id: req.body.user_id,
      nft_id: req.body.nft_id,
      validate: req.body.validate,
      etps: req.body.etps
    }
  
    FinancingPlan.findOne({
      where: {
        id: check
      }
    })
      .then(financing_plan => {
        if (financing_plan) {
          financing_plan.update({
            rate_interest: req.body.rate_interest,
            rate_insurance: req.body.rate_insurance,
            contribution: req.body.contribution,
            monthly_loan: req.body.monthly_loan,
            housing_price: req.body.housing_price,
            user_risk: req.body.user_risk,
            user_id: req.body.user_id,
            nft_id: req.body.nft_id,
            validate: req.body.validate,
            etps: req.body.etps
          });
          res.json(financing_plan);
        } else {
          res.send('Financing Plan does not exist');
        }
      })
      .catch(err => {
        res.send('error: ' + err);
      })
  
  
    })


    users.put('/validate_financing_plan/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
      var check = req.params.id;
      console.log(req.body.validate);
      const financingPlanData = {
        validate: req.body.validate,
      }
    
      FinancingPlan.findOne({
        where: {
          id: check
        }
      })
        .then(financing_plan => {
          if (financing_plan) {
            financing_plan.update({
              validate: req.body.validate,
            });
            res.json(financing_plan);
          } else {
            res.send('Financing Plan does not exist');
          }
        })
        .catch(err => {
          res.send('error: ' + err);
        })
    
    
      })




// NFT


users.post('/create_nft',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const nftData = {
    nftUri: req.body.nftUri,
    creator_etps: req.body.creator_etps,
    price: req.body.price
  }

  Nft.findOne({
    where: {
      nftUri: req.body.nftUri
    }
  })
    .then(nft => {
      if (!nft) {
        Nft.create(nftData)
          .then(nft => {
            res.json({ nft })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'NFT whit this ID already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



users.get('/nfts', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  Nft.findAll({
  })
    .then(nft => {
      if (nft) {
        res.json(nft)
      } else {
        res.send('No one')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/nft/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Nft.findAll({
    where: {
      id: r_id
    }
  })
    .then(nft => {
      if (nft) {
        res.json(nft)
      } else {
        res.send('NFT does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.delete('/delete_nft/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  var r_id = req.params.id;

  Nft.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})



users.put('/update_nft/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  var check = req.params.id;
  const nftData = {
    nftUri: req.body.nftUri,
    creator_etps: req.body.creator_etps,
    price: req.body.price
  }

  Nft.findOne({
    where: {
      id: check
    }
  })
    .then(nft => {
      if (nft) {
        nft.update({
        nftUri: req.body.nftUri,
          creator_etps: req.body.creator_etps,
          price: req.body.price
        });
        res.json(nft);
      } else {
        res.send('NFT does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
  })

module.exports = users