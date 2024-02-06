import express from "express";
const router = express.Router();
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controller/prisma";

router.get("/read", getUser);
router.post("/create", createUser);
router.patch("/update", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
