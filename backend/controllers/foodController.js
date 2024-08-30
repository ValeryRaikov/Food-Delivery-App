import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    const imageFilename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageFilename,
    });

    try {
        await food.save();

        res.json({
            success: true,
            message: 'Food Added',
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error saving food',
        });
    }
}

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        res.json({
            success: true,
            data: foods, 
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error',
        });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.body.id);

        fs.unlink(`uploads/${foodItem.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: 'Food removed successfully',
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error removing food',
        });
    }
}

export {
    addFood,
    listFood,
    removeFood,
};