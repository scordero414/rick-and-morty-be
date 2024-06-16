import { Dialect, Sequelize } from 'sequelize';
import config from './config/config.json';

const env = process.env.NODE_ENV || 'development';
const { username, database, host, dialect, port, password } =
  config[env as keyof typeof config];

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: dialect as Dialect,
});

export default sequelize;
