import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'findyourquest',
  'adrianfersameta',
  'SGG400pro!',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

export { sequelize };
