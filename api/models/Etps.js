const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'etps',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    access_code: {
      type: Sequelize.INTEGER
    },
    entreprise: {
      type: Sequelize.STRING
    },
    is_banned: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)