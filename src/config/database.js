require('dotenv').config()
const pg = require('pg');
module.exports = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  url: process.env.POSTGRES_URL,
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: true,
    module: pg,
  },
  define: {
    timestamps: true,
    underscored: false,
  },
};
