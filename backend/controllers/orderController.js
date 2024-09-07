import Stripe from "stripe";

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

        response.json({
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

export { placeOrder };