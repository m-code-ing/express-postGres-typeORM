import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  if (!firstName || !lastName || !email || !cardNumber) {
    return res.json({
      msg: "All fields are required",
    });
  }
  const existingClients = await Client.find();
  let emailPresent = false;
  let cardPresent = false;

  existingClients.map((client) => {
    if (client.email === email) {
      emailPresent = true;
      return;
    }

    if (client.card_number === cardNumber) {
      cardPresent = true;
      return;
    } else {
      return;
    }
  });

  if (emailPresent) {
    return res.json({
      msg: "Client email already exist",
    });
  }

  if (cardPresent) {
    return res.json({
      msg: "Duplicate Card Number. Select a different card number.",
    });
  }

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance: 0,
  });

  await client.save();
  return res.json({
    msg: "Success",
  });
});

export { router as createClientRouter };
