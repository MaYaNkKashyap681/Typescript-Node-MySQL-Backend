import express, { Router } from "express";
const { register, login, logout } = require("../controllers/usercontroller");

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
