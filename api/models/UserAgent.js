const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user_agent',
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
    phone_number: {
      type: Sequelize.STRING
    },
    mail_addr: {
      type: Sequelize.STRING
    },
    pwd: {
      type: Sequelize.STRING
    },
    public_key: {
      type: Sequelize.STRING
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
