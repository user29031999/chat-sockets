import { Sequelize } from 'sequelize';
import initModels from '../models/init-models.js';

const sequelize = new Sequelize('messaging_app_db', 'messaging_user', 'UserRoot2903@', {
    host: 'localhost',
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