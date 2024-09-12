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

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "bgn",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const totalAmount = req.body.items.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        if (totalAmount < 50) {
            line_items.push({
                price_data: {
                    currency: "bgn",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: Math.round(5 * 100),
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
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

// List all orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error',
        });
    }
}

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({
            success: true,
            message: 'Status updated',
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error',
        });
    }
}

export { 
    placeOrder, 
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus,
};