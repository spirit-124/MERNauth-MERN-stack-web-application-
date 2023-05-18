import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errHandler } from "./middleware/errormiddleware.js";
import connectDB from "./config/db.js";

connectDB();
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", userRoutes);
app.get("/", (req, res) => {
  res.send("server is listening");
});

app.use(notFound);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
