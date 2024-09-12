import Stripe from "stripe";

import 'dotenv/config';

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontendUrl = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const lineItems = req.body.items.map(item => ({
            priceData: {
                currency: "bgn",
                productData: {
                    name: item.name,
                },
                unitAmount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        lineItems.push({
            priceData: {
                currency: "bgn",
                productData: {
                    name: "Delivery Charges"
                },
                unitAmount: Math.round(5 * 100),
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            lineItems,
            mode: "payment",
            successUrl: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancelUrl: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({
            success: true,
            sessionUrl: session.url,
        })
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error",
        });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            res.json({
                success: true,
                message: "Successfully paid",
            });
        } else {
            await orderModel.findByIdAndDelete(orderId, { payment: false });

            res.json({
                success: false,
                message: "Error with payment",
            });
        }
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error",
        });
    }
}

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const order = await orderModel.find({ userId: req.body.userId });
        res.json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error",
        });
    }
}

export { 
    placeOrder, 
    verifyOrder,
    userOrders,
};