import express from "express";
import db from "../db/conn.mjs";

const Foods = express.Router();


Foods.get("/", async(req, res) => {
    res.send("Working")
} )

Foods.post("/add-item", async (req, res) => {
  console.log(req.body);
  try {
    const {
      foodName,
      foodImage,
      foodCategory,
      quantity,
      price,
      addBy,
      foodOrigin,
      description,
    } = req.body;

    const newFood = {
      foodName,
      foodImage,
      foodCategory,
      quantity,
      price,
      addBy,
      foodOrigin,
      description,
    };

    console.log(newFood);

    const collection = db.collection("foods");

    await collection.insertOne(newFood);
    res.status(201).json({ message: "Food item added successfully" });
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default Foods;
