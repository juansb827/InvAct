require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mssql",
    "dialectOptions": {
      "instanceName": process.env.DB_INSTANCE
    },
    "pool": {
      "max": 5,
      "min": 1,
      "idle": 10000
    },
    "define": {
      "timestamps": false,
      "freezeTableName": true
    }
  }
 
}
