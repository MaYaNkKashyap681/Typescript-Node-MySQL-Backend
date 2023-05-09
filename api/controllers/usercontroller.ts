import { Request, Response, NextFunction, query } from "express";
// import { CustomErr } from "../errormaker";
const db = require("../database/connect");
// const { customError } = require("../errormaker");
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { newUser } from "../customtypes/newUser";

module.exports.register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password }: newUser = req.body;
    const q1 = "SELECT * from users WHERE email = ?";
    db.query(q1, [email], (err: Error, data: any) => {
      if (data.length === 1) {
        return res.status(500).json({
          msg: "User Already Exist",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashed_password = bcrypt.hashSync(password, salt);
      const q2 = "INSERT INTO users (`username`,`password`,`email`) VALUES (?)";
      const values = [username, hashed_password, email];
      db.query(q2, [values], (err: Error, data: any) => {
        if (err) {
          return res.status(501).json(err);
        }
        return res.status(200).json("User is created successfully");
      });
    });
  } catch (err: any) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports.login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (err: Error, data: any) => {
      if (err) {
        return res.json(err);
      }
      if (data.length === 0) {
        console.log(data);
        return res.json("User Does Not Exist!");
      }
      const user = data[0];
      const isCorrect = bcrypt.compareSync(password, user.password);
      if (isCorrect) {
        const token = jwt.sign({ id: user.id }, "This is Secret");
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ ...user, token, password: null });
      } else {
        return res.json("Bad Credentials!");
      }
    });
  } catch (err: any) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports.logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("access_token").status(200).json("Successfully Logout");
  } catch (err) {
    next(err);
  }
};
