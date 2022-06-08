const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_ID, process.env.DB_USER_MDP, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db