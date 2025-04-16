import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        pool: {
            max: 5,
            min: 0,
            acquire: 3000,
            idle: 1000
        }
    })
sequelize.authenticate()
    .then(() => console.log('database connected sucessfully...'))
    .catch((err) => console.log('error: ', err))

export default sequelize;