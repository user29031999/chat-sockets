import express from "express";
import createMessagingController from '../controllers/messaging.js';

const router = express.Router();

function createMessagingRoute(io) {
    const messagingController = createMessagingController(io);
    router.post('/', messagingController.MessagingSocket)
    return router;
}

export default createMessagingRoute;