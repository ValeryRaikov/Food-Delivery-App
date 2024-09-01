import express from "express";
import multer from "multer";

import { addFood, listFood, getFoodById, editFood, removeFood, } from "../controllers/foodController.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage, });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.get('/:foodId', getFoodById);
foodRouter.put(`/edit/:foodId`, upload.single('image'), editFood);
foodRouter.post(`/remove/:foodId`, removeFood);

export default foodRouter;