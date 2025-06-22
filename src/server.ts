import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
let server: Server;
const PORT = 4000;
const uri = process.env.MONGODB_URI as string;
async function main() {
  await mongoose.connect(uri);
  console.log("✅✅database connected successfully");
  try {
    server = app.listen(PORT, () => {
      console.log(`👿👿 server is running in ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
