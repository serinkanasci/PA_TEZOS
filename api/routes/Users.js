const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const UserAgent = require('../models/UserAgent')
const FinancingPlan = require('../models/FinancingPlan')
const Nft = require('../models/Nft')
const Etps = require('../models/Etps')

var nodemailer = require('nodemailer');
var fs = require('fs');

var multer  = require('multer');
const Etps = require('../models/Etps')
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
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});




users.use(cors())

process.env.SECRET_KEY = 'secret'


const ipfilter = require('express-ipfilter-secured').IpFilter

const ips = ['::ffff:']


users.get('/check/:check',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var check = req.params.check;
  try {
    jwt.verify(check, process.env.SECRET_KEY);
 } catch(ex) {
   res.send('error')
 }
  res.send("ok");

})



function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.ID)
    const passwordMatches = basicAuth.safeCompare(password, process.env.MDP)
 
    return userMatches & passwordMatches
}

// User 

users.post('/register',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const userData = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    post_addr: req.body.post_addr,
    country: req.body.country,
    city: req.body.city,
    street_addr: req.body.street_addr,
    phone_number: req.body.phone_number,
    mail_addr: req.body.mail_addr,
    pwd: req.body.pwd,
    public_key: req.body.public_key,
    mensuality: req.body.mensuality,
    birth_date: req.body.birth_date,
    is_banned: req.body.is_banned
  }


  User.findOne({
    where: {
      mail_addr: req.body.mail_addr
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
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
      id: r_id
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
    public_key: req.body.public_key,
    mensuality: req.body.mensuality,
    birth_date: req.body.birth_date,
    is_banned: req.body.is_banned
  }

  User.findOne({
    where: {
      id: check
    }
  })
    .then(user => {
      if (user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
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
            public_key: req.body.public_key,
            mensuality: req.body.mensuality,
            birth_date: req.body.birth_date,
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


// Entreprises 

users.post('/createEtp',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const etpData = {
    id: etps.id,
    access_code: req.body.access_code,
    entreprise: req.body.entreprise,
    is_banned: req.body.is_banned
  }


  Etps.findOne({
    where: {
      entreprise: req.body.entreprise
    }
  })
    .then(etp => {
      if (!etp) {
        Etps.create(etpData)
          .then(etp => {
            res.json({ status: etp.entreprise + ' Registered!' })
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
    .then(etp => {
      if (etp) {
        res.json(etp)
      } else {
        res.send('No one')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/etp/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Etps.findAll({
    where: {
      id: r_id
    }
  })
    .then(etp => {
      if (etp) {
        res.json(etp)
      } else {
        res.send('Entreprise does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.delete('/delete_etp/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  var r_id = req.params.id;

  Etps.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})



users.put('/update_etp/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  var check = req.params.id;
  const etpData = {
    access_code: req.body.access_code,
    entreprise: req.body.entreprise,
    is_banned: req.body.is_banned
  }

  Etps.findOne({
    where: {
      id: check
    }
  })
    .then(etp => {
      if (user) {
        etp.update({
          access_code: req.body.access_code,
          entreprise: req.body.entreprise,
          is_banned: req.body.is_banned

        });
        res.json(etp);
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
      id: req.body.id,
      rate_interest: req.body.rate_interest,
      rate_insurance: req.body.rate_insurance,
      yearly_income: req.body.yearly_income,
      contribution: req.body.contribution,
      monthly_loan: req.body.monthly_loan,
      housing_price: req.body.housing_price,
      user_risk: req.body.user_risk,
      age: req.body.age
    }

    FinancingPlan.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(financing_plan => {
        if (!financing_plan) {
          FinancingPlan.create(financingPlanData)
            .then(financing_plan => {
              res.json({ status: financing_plan.id + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Financing Plan already exists' })
        }
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
      yearly_income: req.body.yearly_income,
      contribution: req.body.contribution,
      monthly_loan: req.body.monthly_loan,
      housing_price: req.body.housing_price,
      user_risk: req.body.user_risk,
      age: req.body.age
    }
  
    FinancingPlan.findOne({
      where: {
        id: check
      }
    })
      .then(financing_plan => {
        if (user) {
          financing_plan.update({
            rate_interest: req.body.rate_interest,
            rate_insurance: req.body.rate_insurance,
            yearly_income: req.body.yearly_income,
            contribution: req.body.contribution,
            monthly_loan: req.body.monthly_loan,
            housing_price: req.body.housing_price,
            user_risk: req.body.user_risk,
            age: req.body.age
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



// User Agent


users.post('/create_user_agent',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const user_agentData = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone_number: req.body.phone_number,
    mail_addr: req.body.mail_addr,
    pwd: req.body.pwd,
    public_key: req.body.public_key,
    entreprise: req.body.entreprise,
    is_banned: req.body.is_banned
  }


  UserAgent.findOne({
    where: {
      mail_addr: req.body.mail_addr
    }
  })
    .then(user_agent => {
      if (!user_agent) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user_agentData.password = hash
          UserAgent.create(user_agentData)
            .then(user_agent => {
              res.json({ status: user_agent.mail_addr + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User Agent with this mail address already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



users.get('/user_agents', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  UserAgent.findAll({
  })
    .then(user_agent => {
      if (user_agent) {
        res.json(user_agent)
      } else {
        res.send('No one')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/user_agent/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  UserAgent.findAll({
    where: {
      id: r_id
    }
  })
    .then(user_agent => {
      if (user_agent) {
        res.json(user_agent)
      } else {
        res.send('User Agent does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.delete('/delete_user_agent/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  var r_id = req.params.id;

  UserAgent.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})



users.put('/update_user_agent/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  var check = req.params.id;
  const user_agentData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone_number: req.body.phone_number,
    mail_addr: req.body.mail_addr,
    pwd: req.body.pwd,
    public_key: req.body.public_key,
    entreprise: req.body.entreprise,
    is_banned: req.body.is_banned
  }

  UserAgent.findOne({
    where: {
      id: check
    }
  })
    .then(user_agent => {
      if (user_agent) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user_agent.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone_number: req.body.phone_number,
            mail_addr: req.body.mail_addr,
            pwd: req.body.pwd,
            public_key: req.body.public_key,
            entreprise: req.body.entreprise,
            is_banned: req.body.is_banned

        });

        res.json(user_agent);
        })
      } else {
        res.send('User Agent does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


  })



// NFT


users.post('/create_nft',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const nftData = {
    id: req.body.id,
    nftId: req.body.nftId,
    creator_etps: req.body.creator_etps,
    price: req.body.price
  }

  Nft.findOne({
    where: {
      nftId: req.body.nftId
    }
  })
    .then(nft => {
      if (!nft) {
        Nft.create(nftData)
          .then(nft => {
            res.json({ status: nft.nftId + ' Registered!' })
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
  var r_id = req.params.nftId;

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

  var r_id = req.params.nftId;

  Nft.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})



users.put('/update_nft/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  var check = req.params.nftId;
  const nftData = {
    nftId: req.body.nftId,
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
          nftId: req.body.nftId,
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