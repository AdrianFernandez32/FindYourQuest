import express from "express";
import cors from "cors";
import googleRoutes from "./routes/google/places.js";
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Server error, something went wrong" });
});
app.use("/google", googleRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map