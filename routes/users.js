import express from "express";
const router = express.Router();
import {
  signupUser,
  loginUser,
  verifyToken,
  findAllUser,
  findOneUser,
  updateOneUser,
  deleteOneUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/verify-token", authMiddleware, verifyToken);
router.get("/", authMiddleware, findAllUser);
router.get("/:id", authMiddleware, findOneUser);
router.patch("/:id", authMiddleware, updateOneUser);
router.delete("/:id", authMiddleware, deleteOneUser);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

export default router;
