import * as Sequelize from "sequelize";
import sequelize from "../../configuration/dataBase/SqlService";

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  qty: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Product;
