import { globalErrorHandler } from "./middlewares/GlobalErrorHandler";
import express from "express";
import bodyParser from "body-parser";
import knightsRouter from "./routes/knightsRouter";
import connectDB from "./db/mongodb";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(bodyParser.json());

app.use("/knights", knightsRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
