import { Sequelize } from 'sequelize';
import initModels from '../models/init-models.js';

console.log(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
});*/

const sequelize = new Sequelize('messaging_app_db',
    null,
    null, {
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    replication: {
        read: [
            {
                host: process.env.DB_READ_HOST_1,
                username: process.env.DB_READ_USERNAME_1,
                password: process.env.DB_READ_PASS_1,
            },
            {
                host: process.env.DB_READ_WRITE_HOST_2,
                username: process.env.DB_READ_WRITE_USERNAME_2,
                password: process.env.DB_READ_WRITE_PASS_2
            }
        ],
        write: {
            host: process.env.DB_READ_WRITE_HOST_2,
            username: process.env.DB_READ_WRITE_USERNAME_2,
            password: process.env.DB_READ_WRITE_PASS_2
        }
    }
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