import express from "express";
import router from "./router/auth.router.js";
import dotenv from "dotenv";
import connectDb from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
import dashboardRoutes from "./router/dashboard.router.js";
import transactionRoutes from "./router/transaction.router.js";

dotenv.config();
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/auth/dashboard", dashboardRoutes);
app.use("/api/auth/transactions", transactionRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
})
