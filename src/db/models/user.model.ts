import { Model, DataTypes } from 'sequelize';
import Sequelize from '../sequelize';
import UserCharacter from './user-character.model';

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    sequelize: Sequelize,
    modelName: 'User',
  }
);

export default User;
