import express, { Application, Request, Response } from "express";

import { booksRoutes } from "./app/Controllers/books.controller";
const app: Application = express();
app.use(express.json());

app.use("/api", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log("hellow this is lybrary management api");
});

export default app;
