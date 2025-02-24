import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/product";

// ✅ GET: Fetch all products from the database
export async function GET(req: Request) {
    try {
      await connectToDB();
  
      // Get query params
      const { searchParams } = new URL(req.url);
      const category = searchParams.get("category");
      const subCategory = searchParams.get("subCategory");
  
      let filter: any = {};
      if (category) filter.category = category;
      if (subCategory) filter.subCategory = subCategory;
  
      // Fetch products based on filters
      const products = await Product.find(filter);
  
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }
// ✅ POST: Add a new product to the database
export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newProduct = new Product(body);
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
  }
}

// ✅ DELETE: Remove a product by ID
export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
