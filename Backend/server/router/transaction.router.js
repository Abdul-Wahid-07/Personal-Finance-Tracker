import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import addTransaction from "../controllers/transaction.controller.js";

const router = express.Router();

router.route("/add").post(authMiddleware, addTransaction);

export default router;
