import dotenv from "dotenv";
import express from "express";
import * as routes from "./routes";
import databaseSetup from "./startup/database";

const cors = require('cors');
dotenv.config({ path: './.env' });

const PORT: string | undefined = process.env.PORT;
const HOSTNAME: string | undefined = process.env.HOSTNAME;

databaseSetup();

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors({
    origin: '*'
}));

if (PORT && HOSTNAME) {
    app.listen(Number(PORT), HOSTNAME, () => {
        console.log(`--> HTTP Server successfully started at port ${PORT}`);
    });
} else {
    console.log('Failing start server');
}

routes.initRoutes(app);

export default app;