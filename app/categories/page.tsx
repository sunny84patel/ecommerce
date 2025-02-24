"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

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
    if (selectedSubCategory) url += `&subCategory=${selectedSubCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedCategory, selectedSubCategory]);

  return (
    <Box p={4} className="glass rounded-xl shadow-lg">
      <Typography variant="h4" fontWeight="bold" className="text-blue-500">
        {selectedCategory ? `Products in ${selectedCategory}` : "All Products"}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 4, overflow: "hidden", background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "rgba(0, 119, 255, 0.6)" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRODUCT NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CATEGORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SUB CATEGORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} sx={{ transition: "0.3s", "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" } }}>
                <TableCell className="font-semibold">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.subCategory}</TableCell>
                <TableCell className="text-blue-500 font-bold">Rs {product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
