// import compression from "compression";
import cors from "cors";
import express, { Express, Request, Response } from "express";
// import helmet from "helmet";
// import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "config";
import log from "./utils/logger";
import router from "./routes/root";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || config.get("port");
const dbUri = config.get<string>("dbUri");

app.use(router);

// add middlewares
// app.use(helmet());
// app.use(compression());
app.use(cors());
// app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World");
});

mongoose.connect(dbUri, {}, (err) => {
	if (err) {
		console.log(err, "Database connection error");
	} else {
		log.info("Connected to the Database");
	}
});

app.listen(port, () => {
	log.info(`The application is listening on port ${port}`);
});
