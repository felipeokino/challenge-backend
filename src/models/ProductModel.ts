import { DataTypes, Model, Sequelize } from 'sequelize';

type ProductAttributes = {
  id?: number;
  name: string;
  description: string;
  price: number;
  deletedAt: Date | null;
}

export default class Product extends Model<ProductAttributes> {
  static initModel(sequelize: Sequelize): typeof Product {
    return Product.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      deletedAt: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'product',
    })
  }
}
