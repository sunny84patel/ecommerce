import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  discountPrice: number;
  rating: number;
  image: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
