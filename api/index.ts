import express, { Express,Request, Response, NextFunction } from "express";
const PORT: number = 3000;
const app: Express = express();
import { CustomErr } from "./errormaker";
import cookieParser from "cookie-parser";
const {authmiddleware} = require('./middlewares/authMiddlewares')
const isAuth = require('./middlewares/authMiddlewares')

//global routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//custom routes
app.use('/auth/', require('./routes/userroute'));
// app.use(isAuth)
app.use("/v1/", require("./routes/itemsroute"));

//error handler
app.use((err: CustomErr, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.code || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).send(errorMessage);
});

function startServer() {
  try {
    app.listen(PORT, () => {
      console.log("Server Successfully Started");
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
