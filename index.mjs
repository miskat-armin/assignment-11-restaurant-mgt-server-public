import cors from "cors";
import express from "express";
import "express-async-errors";
import "./loadEnvironment.mjs";
import brands from './routes/brands.mjs'
import carts from './routes/carts.mjs'
import products from './routes/products.mjs'

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
