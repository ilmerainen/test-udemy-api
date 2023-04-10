const { Sequelize } = require('sequelize');

let sequelize = null;

const getSequelizeInstance = () => {
  return (sequelize =
    sequelize ||
    new Sequelize({
      host: 'localhost',
      dialect: 'postgres',
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    }));
};

const initSequelize = async () => {
  const sequelize = getSequelizeInstance();

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

exports.getSequelizeInstance = getSequelizeInstance;
exports.initSequelize = initSequelize;
