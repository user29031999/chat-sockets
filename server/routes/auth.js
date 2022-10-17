import express from "express";
import createAuthController from '../controllers/auth.js';

const router = express.Router();

async function createAuthRoute(sequelize) {
    const authController = await createAuthController(sequelize);
    router.post('/', authController.AuthUser);
    router.post('/login', authController.Login);
    router.get('/logout', authController.LogOut);
    return router;
}

export default createAuthRoute;