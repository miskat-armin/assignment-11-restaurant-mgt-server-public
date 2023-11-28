import cors from "cors";
import express from "express";
import "express-async-errors";
import "./loadEnvironment.mjs";
import Foods from "./routes/Foods.mjs";
import Users from "./routes/Users.mjs";
import Purchases from "./routes/purchases.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/foods", Foods);
app.use("/api/users", Users);
app.use("/api/purchases", Purchases);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.use("/",(req, res)=> {
  res.json("Server is running")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
