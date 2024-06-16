import { Model, DataTypes } from 'sequelize';
import Sequelize from '../sequelize';
import Character from './character.model';
import Comment from './comment.model';
import User from './user.model';

class UserCharacter extends Model {}

UserCharacter.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    characterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'characters',
        key: 'id',
      },
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'user_characters',
    sequelize: Sequelize,
    updatedAt: false,
    modelName: 'UserCharacter',
  }
);

Character.hasMany(UserCharacter, { foreignKey: 'characterId' });
UserCharacter.belongsTo(Character, {
  foreignKey: 'characterId',
  as: 'character',
});

Comment.belongsTo(UserCharacter, { foreignKey: 'userCharacterId' });

User.hasMany(UserCharacter, { foreignKey: 'userId' });
UserCharacter.belongsTo(User, { foreignKey: 'userId' });

export default UserCharacter;
