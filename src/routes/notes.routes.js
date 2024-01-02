import { Router } from "express";
import {
  createNote,
  deleteNotes,
  retriveNotes,
  updateNotes,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/create").post(createNote);
router.route("/retrive").get(retriveNotes);
router.route("/update").post(updateNotes);
router.route("/delete").post(deleteNotes);

export default router;
