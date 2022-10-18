import { Sequelize } from 'sequelize';
import initModels from '../models/init-models.js';

console.log(process.env.DB_HOST);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
});

export default async function initSequelize() {
    try {
        await sequelize.authenticate();
        console.log('connection success');
        const models = initModels(sequelize);
        return {
            connection: sequelize,
            models,
        }
    } catch (error) {
        console.error('Unable to connect: ', error)
    }
}