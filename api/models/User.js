const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    post_addr: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    street_addr: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    mail_addr: {
      type: Sequelize.STRING
    },
    pwd: {
      type: Sequelize.STRING
    },
    mensuality: {
      type: Sequelize.DATE
    },
    birth_date: {
      type: Sequelize.DATE
    },
    entreprise: {
      type: Sequelize.STRING
    },
    is_banned: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
)