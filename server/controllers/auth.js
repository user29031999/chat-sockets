import User from '../models/user.js';
import bcrypt from 'bcrypt';

async function AuthUser() {
    return async (req, res) => {
        console.log(req.session);
        if (req.session.user) {
            res.status(200).json(req.session.user);
        } else {
            res.status(401);
        }
        res.end();
    }
}

async function Login(sequelize) {
    return async (req, res) => {
        const user = req.body;
        const users = await sequelize.models.user.findOne({
            where: {
                username: user.username,
            }
        });

        if (users === null) {
            console.log('Not found!');
            res.status(403);
        } else {
            const match = await bcrypt.compare(user.password, users.hash);
            console.log(match);
            if (match) {
                req.session.isAuth = true;
                req.session.user = {
                    user_id: users.user_id,
                    username: users.username,
                };

                res.status(200).json({
                    user_session: req.session.user,
                });
            } else {
                res.status(403);
            }
        }
        res.end();
    };
}

async function LogOut(sequelize) {
    return async (req, res) => {
        if (!req.session.user) {
            res.status(200).json({
                message: 'No user session found',
            });
            res.end();
            return;
        }

        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({
                    message: 'Cannot logged out',
                });
            } else {
                req.session = null;
                res.status(200).json({
                    message: 'Session destroyed, user logged out',
                });
            }
            res.end();
        })
    };
}

async function createAuthController(sequelize) {
    return Object.freeze({
        Login: await Login(sequelize),
        LogOut: await LogOut(sequelize),
        AuthUser: await AuthUser(),
    });
}

export default createAuthController;