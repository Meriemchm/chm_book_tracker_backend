import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import readingStatusRoutes from "./routes/readingStatusRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true,              
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/subcategories", subCategoryRoutes);

app.use("/api/readingstatus", readingStatusRoutes);

app.use("api/likes", likeRoutes);

app.get("/", (req, res) => {
  res.send("API is running perfectly!");
});
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
