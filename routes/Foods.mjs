import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const Foods = express.Router();

Foods.get("/get-all-foods", async (req, res) => {
  try {
    const collection = db.collection("foods");
  
    const foods = await collection.find({}).toArray();
    res.status(200).json(foods);

  } catch (error) {
    console.error("Error getting all foods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


Foods.get("/get-all-foods/:page", async (req, res) => {
  try {
    const itemsPerPage = 9;
    const collection = db.collection("foods");
    const page = parseInt(req.params.page, 10);
    const skip = (page - 1) * itemsPerPage;
  
    const foods = await collection.find({}).skip(skip).limit(itemsPerPage).toArray();
    res.status(200).json(foods);

  } catch (error) {
    console.error("Error getting all foods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Foods.get('/get-food-details/:id', async (req, res) => {
  try {
    const foodId = req.params.id
    const collection = db.collection("foods");

    const foodDetails = await collection.findOne({ _id: new ObjectId(foodId)});


    if (!foodDetails) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json(foodDetails);
  } catch (error) {
    console.error('Error getting food details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


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

    const collection = db.collection("foods");

    await collection.insertOne(newFood);
    res.status(201).json({ message: "Food item added successfully" });
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


Foods.get('/added-by-user/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;

    // Fetch all items added by the user
    const userAddedItems = await db
      .collection('foods')
      .find({ 'addBy.email': userEmail })
      .toArray();

    res.status(200).json(userAddedItems);
  } catch (error) {
    console.error('Error fetching user-added items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default Foods;
