import { verify } from "crypto";
import { Request, Response, NextFunction } from "express";
// const jwt = require("jsonwebtoken");
const { decodeToken } = require("../utils/tokenDecoder");
import jwt from "jsonwebtoken";
const SECRET: string = "This is Secret";

type UserId = {id: string}

export interface IGetUserAuthInfoRequest extends Request {
  user: UserId; // or any other type
  headers: any;
}
const isAuth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  // This checks to see if there is an authorization field within the incoming request
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(404).send("Token not Found");
    }
    const _token = authHeader.split(" ")[1];
    const isValid = await jwt.verify(_token, SECRET);
    if (!isValid) {
      return res.status(498).json({
        msg: "Token is not valid",
      });
    }
    const user = decodeToken(_token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      msg: "There is Internal Fault",
    });
  }
  // if there is no token
};

module.exports = isAuth;
