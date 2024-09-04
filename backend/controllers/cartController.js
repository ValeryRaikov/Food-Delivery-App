import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findOneAndUpdate(req.body.userId, { cartData });
        
        res.json({
            success: true,
            message:'Added to cart',
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message:'Error adding food to cart!',
        });
    }
}

// Remove items from user cart
const removeFromCart = async (req, res) => {

}

// Fetch user cart
const getCart = async (req, res) => {

}

export {
    addToCart,
    removeFromCart,
    getCart,
};