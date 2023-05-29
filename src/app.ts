import mongoose from 'npm:mongoose@^7.2.1'
import { load, Application, oakCors } from '../lib.ts'
import userApi from "./Routes/api/userApi.ts";
import cors from './cors/cors.ts'


const env = await load();
const MONGODB_URI = env["MONGODB_URI"]
const PORT = env["PORT"]
const HOSTNAME = env["HOSTNAME"]
const app = new Application();

try {
  await mongoose.connect(String(MONGODB_URI));
  console.log("Connected to MongoDB");

  app.use(oakCors(cors))
  app.use(userApi.prefix("/api/users").routes());
  app.listen({hostname: HOSTNAME, port: parseInt(PORT, 10)});
  console.log(`Server started at http://${HOSTNAME}:${PORT}`)
  console.log(`Allowed origin ${env["WHITELIST"]}`)
} catch (error) {
  console.error(error);
}
