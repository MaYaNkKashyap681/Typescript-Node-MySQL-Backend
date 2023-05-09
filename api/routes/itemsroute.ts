import express, { Router } from "express";
const {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemcontroller");
const isAuth = require('../middlewares/authMiddlewares')
const router: Router = express.Router();

router.get("/items", getItems);
router.get("/item/:itemId", getItem);
router.post("/item/new/:userId", isAuth, addItem);
router.delete("/item/:itemId/:userId", isAuth, deleteItem);
router.patch("/item/edit/:itemId/userId", isAuth, updateItem);

module.exports = router;
