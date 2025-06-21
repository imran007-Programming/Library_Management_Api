import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
let server: Server;
const PORT = 4000;
const uri =
  "mongodb+srv://mongodb:mongodb@cluster0.v9pyuxs.mongodb.net/booksStore?retryWrites=true&w=majority&appName=Cluster0";
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
