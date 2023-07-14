import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import googleRoutes from "./routes/places.routes.js";
import UsersRoutes from "./routes/users.routes.js";
import LoginRoute from "./routes/auth.routes.js";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3001);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Server error, something went wrong" });
    });
  }

  routes() {
    this.app.use("/google", googleRoutes);
    this.app.use("/users", UsersRoutes);
    this.app.use("/login", LoginRoute);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server on port", this.app.get("port"));
  }
}
