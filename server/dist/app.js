import express from "express";
import morgan from "morgan";
import cors from "cors";
import googleRoutes from "./routes/places.routes.js";
import UsersRoutes from "./routes/users.routes.js";
import LoginRoute from "./routes/auth.routes.js";
import ItineraryRoutes from "./routes/itineraries.route.js";
import ActivityRoutes from "./routes/activities.route.js";
import TripRoutes from "./routes/trips.route.js";
import HotelRoutes from "./routes/hotels.route.js";
import FlightRoutes from "./routes/flights.routes.js";
export class App {
    constructor(port) {
        this.port = port;
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
        this.app.use(cors({
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: "Server error, something went wrong" });
        });
    }
    routes() {
        this.app.use("/google", googleRoutes);
        this.app.use("/users", UsersRoutes);
        this.app.use("/login", LoginRoute);
        this.app.use("/itineraries", ItineraryRoutes);
        this.app.use("/activities", ActivityRoutes);
        this.app.use("/trips", TripRoutes);
        this.app.use("/hotels", HotelRoutes);
        this.app.use("/flights", FlightRoutes);
    }
    async listen() {
        await this.app.listen(this.app.get("port"));
        console.log("Server on port", this.app.get("port"));
    }
}
//# sourceMappingURL=app.js.map