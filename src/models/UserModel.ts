import { DataTypes, Model, Sequelize } from 'sequelize';

type UserAttributes = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export default class User extends Model<UserAttributes> {
  static initModel(sequelize: Sequelize): typeof User {
    return User.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'user',
    })
  }
}

