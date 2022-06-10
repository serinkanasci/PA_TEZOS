const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Commande = require('../models/Commande')
const Detail = require('../models/Detail')
const Devis = require('../models/Devis')
const Facture = require('../models/Facture')
const Presta = require('../models/Presta')
const Etps_img = require('../models/Etps_img')
var basicAuth = require("express-basic-auth")
var nodemailer = require('nodemailer');
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




users.post('/upload',upload.single('file'),function(req, res, next) {
  console.log(req.file);
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({ fileUrl: 'http://localhost:5000/tempo/' + req.file.filename });
})


users.get('/display/:name', (req, res) => {
  var r_name = req.params.name;

  fs.readFile( process.env.PATH_FILE+r_name, function(err, data) {
    if (err) throw err; // Fail if the file can't be read.
    else {
      if(r_name.substring(r_name.length-3,r_name.length+1).localeCompare("png")===0){
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(data); // Send the file data to the browser.
      }
      else if(r_name.substring(r_name.length-3,r_name.length+1).localeCompare("jpg")===0 || r_name.substring(r_name.length-4,r_name.length+1).localeCompare("jpeg")===0 ){
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(data); // Send the file data to the browser.
      }
      else{
        res.json( 'Error' );
      }
      
    }
  });
})



users.post('/create_img',upload.single('file'),function(req, res, next) {
  console.log(req.file);
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  const userData = {
    etps: req.body.etps,
    img:  req.file.filename 
  }

  Etps_img.findOne({
    where: {
      etps: req.body.etps
    }
  })
    .then(etps_img => {
      if (!etps_img) {
         Etps_img.create(userData)
            .then(etps_img => {
              res.json( ' Enregistré !' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
      } else {
        res.json({ error: 'Etps already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})





/*users.post('/create_img',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  const userData = {
    etps: req.body.etps,
    img: req.body.img
  }

  Etps_img.findOne({
    where: {
      etps: req.body.etps
    }
  })
    .then(etps_img => {
      if (!etps_img) {
         Etps_img.create(userData)
            .then(etps_img => {
              res.json( ' Enregistré !' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
      } else {
        res.json({ error: 'Etps already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})*/

users.post('/register',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  
  const userData = {
    login: req.body.login,
    password: req.body.password,
    status: req.body.status,
  }


  User.findOne({
    where: {
      login: req.body.login
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.login + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.put('/update_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  var check = req.params.id;
  const userData = {
    login: req.body.login,
    password: req.body.password,
    status: req.body.status,
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
            login: req.body.login,
            password: hash,
            status: req.body.status,

        });

        res.json(user);
        })
      } else {
        res.send('Account does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })


  })


  users.put('/update_userf', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
    var user_detail_bool;
    const userData = {
      login: req.body.login,
      password: req.body.password
    }
  
    User.findOne({
      where: {
        login: userData.login
      }
    })
      .then(user => {
        if (user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            user.update({
              login: req.body.login,
              password: hash,
  
          });
  
          res.json(user);
          })
        } else {
          res.send('Account does not exist');
        }
      })
      .catch(err => {
        res.send('error: ' + err);
      })
  
  
    })


users.put('/update_logo/:id',upload.single('file'),function(req, res, next) {
  console.log(req.file);
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  const userData = {
    id: req.params.id,
    etps: req.body.etps,
    img:  req.file.filename 
  }

  Etps_img.findOne({
    where: {
      id: userData.id
    }
  })
    .then(etps_img => {
      if (etps_img) {
        etps_img.update({
            etps: req.body.etps,
            img:  req.file.filename 

        });

        res.json(etps_img);
      } else {
        res.send('Logo does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})




users.post('/login'/*,ipfilter(ips, {detectIp: customDetection, mode:"deny"})*/,basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  User.findOne({
    where: {
      login: req.body.login
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
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


users.get('/commande/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Commande.findOne({
    where: {
      id: r_id
    }
  })
    .then(commande => {
      if (commande) {
        res.json(commande)
      } else {
        res.send('Commande does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



users.post('/commande', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    Client_Groupe: req.body.Client_Groupe,
    Libelle_Client: req.body.Libelle_Client,
    Code_Client: req.body.Code_Client,
    Num_Commande: req.body.Num_Commande,
    Ref_Client: req.body.Ref_Client,
    Date_Saisie_Commande: req.body.Date_Saisie_Commande,
    Num_Devis: req.body.Num_Devis,
    Statut_Commande: req.body.Statut_Commande,
    HT: parseFloat(req.body.HT),
    TTC: parseFloat(req.body.TTC)
  }
  
  Commande.create(userData)
            .then(commande => {
              res.json( ' Successful!' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
  
})

users.get('/detail/:id',basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Detail.findAll({
    where: {
      Num_Commande: r_id
    }
  })
    .then(detail => {
      if (detail) {
        res.json(detail)
      } else {
        res.send('Detail does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/detail', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    Num_Commande: req.body.Num_Commande,
    Code_Art: req.body.Code_Art,
    Code_Client: req.body.Code_Client,
    Code_Analytique: req.body.Code_Analytique,
    Designation: req.body.Designation,
    Statut: req.body.Statut,
    Facturation: req.body.Facturation,
    Commandee: parseFloat(req.body.Commandee),
    Livree: parseFloat(req.body.Livree),
    Facturee: parseFloat(req.body.Facturee),
    Allouee: parseFloat(req.body.Allouee),
    HT: parseFloat(req.body.HT),
    Bundle: req.body.Bundle
  }
  
  Detail.create(userData)
            .then(detail => {
              res.json( ' Successful!' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
  
})

users.get('/detail', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Detail.findAll({
  })
    .then(detail => {
      if (detail) {
        res.json(detail)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.delete('/delete_detail', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  Detail.destroy({where: {}}).then(function () {});
})


users.post('/presta', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    No_ticket: req.body.No_ticket,
    Statut: req.body.Statut,
    Date_debut_planifie_action: req.body.Date_debut_planifie_action,
    Groupe_affectation: req.body.Groupe_affectation,
    Code_entite: req.body.Code_entite,
    No_de_commande: req.body.No_de_commande,
    Description_ticket: req.body.Description_ticket,
    Pdf_url: req.body.Pdf_url
  }
  
  Presta.create(userData)
            .then(presta => {
              res.json( ' Successful!' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
  
})

users.post('/facture', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    Client_Groupe: req.body.Client_Groupe,
    Libelle_Client: req.body.Libelle_Client,
    Code_Client: req.body.Code_Client,
    Num_Commande: req.body.Num_Commande,
    Num_Facture: req.body.Num_Facture,
    Montant_Facture: parseFloat(req.body.Montant_Facture),
    Date_Comptable: req.body.Date_Comptable,
    Date_Echeance: req.body.Date_Echeance,
    Lettrage: req.body.Lettrage,
    Anticip: req.body.Anticip
  }
  
  Facture.create(userData)
            .then(facture => {
              res.json( ' Successful!' )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
  
})


users.post('/devis', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {
  const userData = {
    Client_Groupe: req.body.Client_Groupe,
    Libelle_Client: req.body.Libelle_Client,
    Code_Client: req.body.Code_Client,
    Num_Devis: req.body.Num_Devis,
    Date_Crea_Devis: req.body.Date_Crea_Devis,
    Date_Validite: req.body.Date_Validite,
    Montant_Devis: parseFloat(req.body.Montant_Devis)
  }
  
  Devis.create(userData)
            .then(devis => {
              res.json( ' Successful! ok'+req.body.Montant_Devis )
            })
            .catch(err => {
              res.send('error: ' + err)
            })
  
})

users.delete('/delete_devis', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  Devis.destroy({where: {}}).then(function () {});
})


users.delete('/delete_user/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  var r_id = req.params.id;

  User.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})

users.delete('/delete_logo/:id', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  var r_id = req.params.id;

  Etps_img.destroy({where: {
      id: r_id
    }}).then(function () { res.send('Ok') });
})

users.delete('/delete_presta', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  Presta.destroy({where: {}}).then(function () {});
})

users.delete('/delete_commande', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  Commande.destroy({where: {}}).then(function () {});
})

users.delete('/delete_facture', basicAuth( { authorizer: myAuthorizer } ),(req, res) => {

  Facture.destroy({where: {}}).then(function () {});
})

users.get('/commande', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Commande.findAll({
  })
    .then(commande => {
      if (commande) {
        res.json(commande)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/detail', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Detail.findAll({
  })
    .then(detail => {
      if (detail) {
        res.json(detail)
      } else {
        res.send('Detail does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/img', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Etps_img.findAll({
  })
    .then(etps_img => {
      if (etps_img) {
        res.json(etps_img)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/commande/client/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Commande.findAll({
    where: {
      Code_Client: r_id
    }
  })
    .then(commande => {
      if (commande) {
        res.json(commande)
      } else {
        res.send('Client does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/commande/groupe/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Commande.findAll({
    where: {
      Client_Groupe: r_id
    }
  })
    .then(commande => {
      if (commande) {
        res.json(commande)
      } else {
        res.send('Client does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/presta', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Presta.findAll({
  })
    .then(presta => {
      if (presta) {
        res.json(presta)
      } else {
        res.send('Presta does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/facture', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Facture.findAll({
  })
    .then(facture => {
      if (facture) {
        res.json(facture)
      } else {
        res.send('Facture does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/facture/client/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Facture.findAll({
    where: {
      Code_Client: r_id
    }
  })
    .then(facture => {
      if (facture) {
        res.json(facture)
      } else {
        res.send('Facture does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/facture/groupe/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Facture.findAll({
    where: {
      Client_Groupe: r_id
    }
  })
    .then(facture => {
      if (facture) {
        res.json(facture)
      } else {
        res.send('Facture does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/devis/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Devis.findOne({
    where: {
      id: r_id
    }
  })
    .then(devis => {
      if (devis) {
        res.json(devis)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/devis', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Devis.findAll({
  })
    .then(devis => {
      if (devis) {
        res.json(devis)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/devis/client/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Devis.findAll({
    where: {
      Code_Client: r_id
    }
  })
    .then(devis => {
      if (devis) {
        res.json(devis)
      } else {
        res.send('Client does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/devis/groupe/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Devis.findAll({
    where: {
      Client_Groupe: r_id
    }
  })
    .then(devis => {
      if (devis) {
        res.json(devis)
      } else {
        res.send('Client does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


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

users.get('/findallusers', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

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

users.get('/findoneuser/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
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
        res.send('Client does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/findalllogos', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Etps_img.findAll({
  })
    .then(etps_img => {
      if (etps_img) {
        res.json(etps_img)
      } else {
        res.send('No one')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/findonelogo/:id', basicAuth( { authorizer: myAuthorizer } ), (req, res) => {
  var r_id = req.params.id;

  Etps_img.findAll({
    where: {
      id: r_id
    }
  })
    .then(etps_img => {
      if (etps_img) {
        res.json(etps_img)
      } else {
        res.send('Logo does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users
