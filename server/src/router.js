import express from "express";
import {
  CreateFeedback,
  GetAllFeedback,
  GetFeedbackById,
  UpdateFeedback,
  DeleteFeedback,
} from "./service.js";
import ValidateSchema from "./middleware.js"
import { CreateFeedbackSchema, UpdateFeedbackSchema } from "./schema.js";

const router = express.Router();

router.post("/", ValidateSchema(CreateFeedbackSchema), CreateFeedback);
router.get("/", GetAllFeedback);
router.get("/:id", GetFeedbackById);
router.put("/:id", ValidateSchema(UpdateFeedbackSchema), UpdateFeedback);
router.delete("/:id", DeleteFeedback);

export default router;
