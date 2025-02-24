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
  TextField,
  Typography,
  Paper,
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

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // const handleAddProduct = async () => {
  //   const res = await fetch("/api/products", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newProduct),
  //   });
  //   const addedProduct = await res.json();
  //   setProducts([...products, addedProduct]);
  //   setNewProduct({
  //     name: "",
  //     brand: "",
  //     category: "",
  //     subCategory: "",
  //     price: "",
  //     discountPrice: "",
  //     rating: "",
  //     image: "",
  //   });
  // };

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
  
      // Remove the product from state only if the deletion was successful
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold">
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Box display="flex" gap={2} mt={4}>
        {[
          {
            label: "Total Users",
            count: 4442,
            icon: <FaUsers />,
            color: "green",
          },
          {
            label: "Total Orders",
            count: 236,
            icon: <FaShoppingCart />,
            color: "purple",
          },
          {
            label: "Total Products",
            count: products.length,
            icon: <FaBox />,
            color: "blue",
          },
          {
            label: "Total Reviews",
            count: 188,
            icon: <FaStar />,
            color: "orange",
          },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{ backgroundColor: item.color, color: "white", flex: 1 }}
          >
            <CardContent>
              <Typography>{item.label}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {item.count}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Product */}

      {/* Product Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    {product.name}
                  </Box>
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Typography
                    color="gray"
                    sx={{ textDecoration: "line-through" }}
                  >
                    Rs {product.price}
                  </Typography>
                  <Typography color="red">
                    Rs {product.discountPrice}
                  </Typography>
                </TableCell>
                <TableCell>{product.rating} ⭐</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteProduct(product._id)}>
                    <Delete color="error" />
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
