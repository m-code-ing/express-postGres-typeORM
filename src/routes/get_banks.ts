import express from "express";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.get("/api/banks", async (req, res) => {
  const banks = await Banker.find();

  return res.json(banks);
});

export { router as getBanks };
