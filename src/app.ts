import express, { Application, Request, Response } from "express";

import { booksRoutes } from "./app/Controllers/books.controller";
const app: Application = express();
app.use(express.json());

app.use("/api", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "this is library management api",
  });
});

export default app;
