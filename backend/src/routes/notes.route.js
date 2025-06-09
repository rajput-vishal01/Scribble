import express from "express";
import {
  getAllNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getNote,
} from "../controller/notes.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getAllNotes);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);

router.get("/:id", getNote);

export default router;
