import { Router } from "express";
const router = Router();
import * as knightsController from "../controllers/knightsController";
import {
  validateKnightCreateRequest,
  validateKnightUpdateRequest,
} from "../validators/knightRequestValidator";

router.post("/", validateKnightCreateRequest, knightsController.add);
router.put(
  "/nickname/:id",
  validateKnightUpdateRequest,
  knightsController.updateNickname
);
router.delete("/:id", knightsController.remove);

router.get("/", knightsController.getAll);
router.get("/:id", knightsController.getById);

export default router;
