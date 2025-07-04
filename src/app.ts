import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

import { booksRoutes } from "./app/Controllers/books.controller";
const app: Application = express();
app.use(express.json());


app.use(
  cors({
    origin: [
      'https://librarymanagementapp.vercel.app',
      //  "http://localhost:5173"
    ]
   })
);



app.use("/api", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "this is library management api",
  });
});

export default app;
