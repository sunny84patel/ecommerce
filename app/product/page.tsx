"use client";

import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    price: "",
    discountPrice: "",
    rating: "",
    image: "",
  });

  // Fetch existing products from the API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Handle adding a new product
  const handleAddProduct = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
  
      if (!res.ok) {
        console.error("Error adding product:", await res.json());
        return;
      }
  
      const addedProduct = await res.json();
      setProducts([...products, addedProduct]); // ✅ Now stores the `_id`
      setNewProduct({
        name: "",
        brand: "",
        category: "",
        subCategory: "",
        price: "",
        discountPrice: "",
        rating: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Manage Products</Typography>

      {/* Add Product Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Add Product</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField label="Product Name" variant="outlined" size="small" fullWidth value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <TextField label="Brand" variant="outlined" size="small" fullWidth value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
          <TextField label="Category" variant="outlined" size="small" fullWidth value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
          <TextField label="SubCategory" variant="outlined" size="small" fullWidth value={newProduct.subCategory} onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })} />
          <TextField label="Price" variant="outlined" size="small" fullWidth type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <TextField label="Discount Price" variant="outlined" size="small" fullWidth type="number" value={newProduct.discountPrice} onChange={(e) => setNewProduct({ ...newProduct, discountPrice: e.target.value })} />
          <TextField label="Rating" variant="outlined" size="small" fullWidth type="number" value={newProduct.rating} onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })} />
          <TextField label="Image URL" variant="outlined" size="small" fullWidth value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
        </Box>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddProduct}>Add Product</Button>
      </Paper>

    </Box>
  );
}
