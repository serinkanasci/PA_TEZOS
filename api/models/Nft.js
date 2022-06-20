const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'nft',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nftUri: {
      type: Sequelize.STRING
    },
    creator_etps: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
