"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [mounted, setMounted] = useState(false);
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

  // Ensure component only renders after mounting (to prevent hydration issues)
  useEffect(() => {
    setMounted(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!mounted) return null; // Prevent SSR mismatch

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
      setProducts([...products, addedProduct]);

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
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Manage Products
      </Typography>

      {/* Add Product Form */}
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2} textAlign="center">
            Add Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                variant="outlined"
                size="small"
                fullWidth
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                variant="outlined"
                size="small"
                fullWidth
                value={newProduct.brand}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, brand: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                variant="outlined"
                size="small"
                fullWidth
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SubCategory"
                variant="outlined"
                size="small"
                fullWidth
                value={newProduct.subCategory}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, subCategory: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                variant="outlined"
                size="small"
                fullWidth
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount Price"
                variant="outlined"
                size="small"
                fullWidth
                type="number"
                value={newProduct.discountPrice}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, discountPrice: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rating"
                variant="outlined"
                size="small"
                fullWidth
                type="number"
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, rating: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URL"
                variant="outlined"
                size="small"
                fullWidth
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
