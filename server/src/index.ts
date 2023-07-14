import dotenv from "dotenv";
import { App } from "./app.js";

async function main() {
  dotenv.config();
  const app = new App(process.env.PORT || 3001);
  await app.listen();
}

main();
