"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Chip } from "@mui/material";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  subCategory: string;
}

export default function CategoryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedSubCategory = searchParams.get("subCategory");

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let url = "/api/products";
    if (selectedCategory) url += `?category=${selectedCategory}`;
    if (selectedSubCategory) url += `?subCategory=${selectedSubCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedCategory, selectedSubCategory]);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold">
        {selectedCategory ? `Products in ${selectedCategory}` : "All Products"}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell sx={{ backgroundColor: "#1976D2", color: "white" }}>IMAGE</TableCell> */}
              <TableCell sx={{ backgroundColor: "#1976D2", color: "white" }}>PRODUCT NAME</TableCell>
              <TableCell sx={{ backgroundColor: "#1976D2", color: "white" }}>CATEGORY</TableCell>
              <TableCell sx={{ backgroundColor: "#1976D2", color: "white" }}>SUB CATEGORY</TableCell>
              <TableCell sx={{ backgroundColor: "#1976D2", color: "white" }}>PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                {/* <TableCell>
                  <img src={product.image} alt={product.name} width="50" />
                </TableCell> */}
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.subCategory}</TableCell>
                <TableCell>Rs {product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
