import mongoose from "mongoose";

export const connectDatabase = async () => {
    await mongoose.connect(
        'mongodb+srv://valeryraikov:Valeri_R123@cluster0.hwkpk.mongodb.net/food-delivery-app'
    ).then(() => console.log('Database connected successfully'));
}