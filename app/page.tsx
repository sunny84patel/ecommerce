"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useMediaQuery,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FaUsers, FaShoppingCart, FaBox, FaStar } from "react-icons/fa";

interface Product {
  _id?: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  discountPrice: number;
  rating: number;
  image: string;
}

const categories = ["Music", "Footwear", "fashion"];

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDeleteProduct = async (id?: string) => {
    if (!id) return;

    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error deleting product:", errorData.error);
        return;
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true)
  );

  return (
    <Box p={isMobile ? 2 : 4} sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #1f1c2c, #928DAB)" }}>
      <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" color="white">
        Admin Dashboard
      </Typography>

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} mt={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ background: "white", borderRadius: "8px" }}
        />
        <FormControl fullWidth>
          <InputLabel sx={{ color: "white" }}>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ background: "white", borderRadius: "8px" }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          mt: 4,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {isMobile
                ? ["Product", "Price", "Actions"].map((head) => (
                    <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>
                      {head}
                    </TableCell>
                  ))
                : ["Product", "Brand", "Category", "Price", "Rating", "Actions"].map((head) => (
                    <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>
                      {head}
                    </TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    {product.name}
                  </Box>
                </TableCell>
                {!isMobile && <TableCell sx={{ color: "white" }}>{product.brand}</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white" }}>{product.category}</TableCell>}
                <TableCell>
                  <Typography color="gray" sx={{ textDecoration: "line-through" }}>
                    Rs {product.price}
                  </Typography>
                  <Typography color="red">Rs {product.discountPrice}</Typography>
                </TableCell>
                {!isMobile && <TableCell sx={{ color: "white" }}>{product.rating} ⭐</TableCell>}
                <TableCell>
                  <IconButton onClick={() => handleDeleteProduct(product._id)}>
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
