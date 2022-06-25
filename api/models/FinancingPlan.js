const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'financing_plan',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rate_interest: {
      type: Sequelize.FLOAT
    },
    rate_insurance: {
      type: Sequelize.FLOAT
    },
    contribution: {
      type: Sequelize.FLOAT
    },
    monthly_loan: {
      type: Sequelize.FLOAT
    },
    housing_price: {
      type: Sequelize.FLOAT
    },
    user_risk: {
      type: Sequelize.FLOAT
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    nft_id: {
      type: Sequelize.INTEGER
    },
    validate: {
      type: Sequelize.BOOLEAN
    },
    etps: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)