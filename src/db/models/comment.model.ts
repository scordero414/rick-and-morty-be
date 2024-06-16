import { Model, DataTypes } from 'sequelize';
import Sequelize from '../sequelize';
import UserCharacter from './user-character.model';

class Comment extends Model {}

Comment.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userCharacterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'user_characters',
        key: 'id',
      },
    },
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      allowNull: false,
      type: DataTypes.DATE,
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
    tableName: 'comments',
    sequelize: Sequelize,
    modelName: 'Comment',
  }
);

export default Comment;
