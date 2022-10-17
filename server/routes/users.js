import express from "express";
import createUsersController from '../controllers/users.js';

const router = express.Router();

async function createUserRoute(sequelize) {
    const userController = await createUsersController(sequelize);
    router.get('/', userController.GetUser);
    router.post('/', userController.CreateUser);
    return router;
}

export default createUserRoute;