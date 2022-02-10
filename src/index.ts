import { createConnection } from "typeorm";
import express, { application } from "express";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transactions";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transactions";
import { connectBankerToClient } from "./routes/connect_banker_to_client";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "mayank",
      password: undefined,
      database: "typeorm",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("connected to postgres");

    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClient);

    app.listen(8080, () => {
      console.log("listening on port 8080");
    });
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to db");
  }
};

main();
