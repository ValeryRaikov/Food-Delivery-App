import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    let imageFilename = `${req.file.filename}`;

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
            message: 'Error fetching food list',
        });
    }
}

// Get exact food item
const getFoodById = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.params.foodId);

        if (!foodItem) {
            return res.json({
                success: false,
                message: 'Food item not found',
            });
        }

        res.json({
            success: true,
            data: foodItem,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error fetching food item',
        });
    }
}

// Edit food item
const editFood = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.params.foodId);

        if (!foodItem) {
            return res.json({
                success: false,
                message: 'Food item not found',
            });
        }

        let imageFilename = foodItem.image;
        if (req.file) {
            fs.unlink(`uploads/${foodItem.image}`, () => {});
            imageFilename = `${req.file.filename}`;
        }

        foodItem.name = req.body.name || foodItem.name;
        foodItem.description = req.body.description || foodItem.description;
        foodItem.price = req.body.price || foodItem.price;
        foodItem.category = req.body.category || foodItem.category;
        foodItem.image = imageFilename;

        await foodItem.save();

        res.json({
            success: true,
            message: 'Food updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error updating food',
        });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.params.foodId);

        fs.unlink(`uploads/${foodItem.image}`, () => {});

        await foodModel.findByIdAndDelete(req.params.foodId);

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
    getFoodById,
    editFood,
    removeFood,
};