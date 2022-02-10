import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionType } from "../entities/Transactions";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;
  console.log(req.params);
  console.log(req.body);

  const { type, amount } = req.body;

  const client = await Client.findOne(parseInt(clientId));

  if (!client) {
    return res.json({
      msg: "Client not found",
    });
  }

  const transaction = Transaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionType.DEPOSIT) {
    client.balance = client.balance + amount;
  } else {
    client.balance = client.balance - amount;
  }

  await client.save();
  return res.json({
    msg: "Transaction completed",
  });
});

export { router as createTransactionRouter };
