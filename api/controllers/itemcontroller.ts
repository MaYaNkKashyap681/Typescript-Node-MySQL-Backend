import { Request, Response, NextFunction, query } from "express";
import { newItem } from "../customtypes/itemInterface";
import { itemRes } from "../customtypes/itemResInterface";
const db = require("../database/connect");
const { customError } = require("../errormaker");
import { IGetUserAuthInfoRequest } from "../middlewares/authMiddlewares";
const { idCheck } = require("../utils/checkId");

module.exports.getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = "SELECT * FROM items";
    db.query(q, (err: Error, data: itemRes[]) => {
      if (data) {
        res.json(data);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params);
    const { itemId } = req.params;
    const q = "SELECT * FROM items where item_id = ?";
    db.query(q, [itemId], (err: Error, data: itemRes[]) => {
      if (data) {
        res.json(data[0]);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.addItem = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  if (!idCheck(parseInt(req.user.id), parseInt(userId))) {
    return res.status(401).json({
      msg: "You are not authorized User!!!!!",
    });
  }
  const data: newItem = req.body;
  const { item_name, category, price, description } = data;

  try {
    const q =
      "INSERT INTO items (`item_name`, `category`, `price` , `description`) values (?)";
    const values = [item_name, category, price, description];

    const newItem = await db?.query(q, [values]);

    if (newItem) {
      res.json({
        msg: "Item Added Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deleteItem = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId, userId } = req.params;
    if (idCheck(req.user.id, userId)) {
      return res.status(401).json({
        msg: "You are not authorized User!!!!!",
      });
    }
    const q = "Delete from items where item_id = ?";
    db.query(q, [itemId], (err: Error, data: any) => {
      if (data) {
        res.json({
          msg: "Item Deleted Successfully",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateItem = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId, userId } = req.params;

    if (idCheck(req.user.id, userId)) {
      return res.status(401).json({
        msg: "You are not authorized User!!!!!",
      });
    }

    const q_pre = "SELECT item_id, item_name from items where item_id = ?";

    db.query(q_pre, [itemId], (err: Error, data: any) => {
      if (data.length !== 0) {
        const q = "Update items SET ? where item_id = ?";
        //Updating Multiple Fields together
        db.query(q, [req.body, itemId], (err: Error, data: any) => {
          if (data) {
            res.json({
              msg: "Data Updated Successfully",
            });
          }
        });
      } else {
        throw customError(400, "Data Not Found");
      }
    });
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
};
