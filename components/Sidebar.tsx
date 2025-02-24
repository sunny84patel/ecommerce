"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, Category, Dashboard, ShoppingBag, ShoppingCart, ViewCarousel } from "@mui/icons-material";
import Link from "next/link";

export default function Sidebar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch categories from API
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    router.push(`/categories?category=${category}`);
  };

  const handleSubCategoryClick = (subCategory: string) => {
    router.push(`/categories?subCategory=${subCategory}`);
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" } }}>
      <List>
        <ListItemButton component={Link} href="/" sx={{ fontSize: "1.2rem", fontWeight: "bold", py: 2 }}>
          ECOMMERCE
        </ListItemButton>

        <ListItemButton component={Link} href="/">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><ViewCarousel /></ListItemIcon>
          <ListItemText primary="Home Banner Slides" />
        </ListItemButton>

        <ListItemButton component={Link} href="/categories">
          <ListItemIcon><Category /></ListItemIcon>
          <ListItemText primary="Category" />
          {categoryOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((cat: any) => (
              <div key={cat._id}>
                {/* Category Button */}
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleCategoryClick(cat.name)}>
                  <ListItemText primary={cat.name} />
                </ListItemButton>

                {/* Subcategories */}
                {cat.subCategories.map((sub: string) => (
                  <ListItemButton key={sub} sx={{ pl: 6 }} onClick={() => handleSubCategoryClick(sub)}>
                    <ListItemText primary={sub} />
                  </ListItemButton>
                ))}
              </div>
            ))}
          </List>
        </Collapse>

        <ListItemButton component={Link} href="/product">
          <ListItemIcon><ShoppingBag /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
