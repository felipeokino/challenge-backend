import { Options, Sequelize } from 'sequelize';

const database = require('../config/database');
import User from '../models/UserModel';
import Product from '../models/ProductModel';

const sequelize = new Sequelize(database);
sequelize.authenticate();

const user = User.initModel(sequelize);
user.sync();

const product = Product.initModel(sequelize);
product.sync();

export default sequelize;

