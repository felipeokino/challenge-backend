import { Sequelize } from 'sequelize';
const database = require('../config/database');
import User from '../models/User';

const sequelize = new Sequelize(database);
sequelize.authenticate();

const user = User.initModel(sequelize);
user.sync();

module.exports = sequelize;

