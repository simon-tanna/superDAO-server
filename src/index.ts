// import compression from "compression";
import cors from "cors";
import express, { Express, Request, Response } from "express";
// import helmet from "helmet";
// import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const dbUri = "mongodb://localhost/superDao";

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
		console.log("Database connected");
	}
});

app.listen(port, () => {
	console.log(`The application is listening on port ${port}`);
});
