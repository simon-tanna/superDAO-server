"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import compression from "compression";
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import helmet from "helmet";
// import morgan from "morgan";
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const dbUri = "mongodb://localhost/superDao";
// add middlewares
// app.use(helmet());
// app.use(compression());
app.use((0, cors_1.default)());
// app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("Hello World");
});
mongoose_1.default.connect(dbUri, {}, (err) => {
    if (err) {
        console.log(err, "Database connection error");
    }
    else {
        console.log("Database connected");
    }
});
app.listen(port, () => {
    console.log(`The application is listening on port ${port}`);
});
