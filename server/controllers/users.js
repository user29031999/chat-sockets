import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

const SALT_ROUNDS = 10;

export const GetUser = async (sequelize) => {
    return async (req, res) => {
        let users = [];
        console.log('session user', req.session.user);
        if (req.session.user) {
            users = await sequelize.models.user.findAll({
                where: {
                    user_id: {
                        [Op.ne]: req.session.user.user_id,
                    }
                }
            });
        } else {
            users = await sequelize.models.user.findAll();
        }
        console.log('users', users);
        res.status(200).json(users);
        res.end();
    }
};

export const CreateUser = async (sequelize) => {
    return async (req, res) => {
        try {
            const { connection, models } = sequelize;
            const userData = req.body;
            console.log(req.body);
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            const hash = bcrypt.hashSync(userData.password, salt);

            const result = await connection.transaction(async (t) => {
                const user = await models.user.create({
                    username: userData.username,
                    name: userData.name,
                    hash: hash,
                    salt: salt,
                }, { transaction: t })

                return user;
            });

            res.status(200).json({
                user_id: result.user_id,
                ...userData
            });
        } catch (error) {
            console.log('Create user error: ', error);
            res.status(500).json({ message: error.message });
            res.end();
        }
    }
};

async function createUsersController(sequelize) {
    return Object.freeze({
        GetUser: await GetUser(sequelize),
        CreateUser: await CreateUser(sequelize),
    });
}

export default createUsersController;