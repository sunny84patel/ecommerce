"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore, Category, Dashboard, ShoppingBag, ShoppingCart, ViewCarousel, Menu } from "@mui/icons-material";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";

export default function Sidebar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
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
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleCategoryClick(cat.name)}>
                <ListItemText primary={cat.name} />
              </ListItemButton>
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
  );

  return (
    <>
      {isMobile && (
        <IconButton onClick={handleDrawerToggle} sx={{ position: "absolute", top: 16, left: 16 }}>
          <Menu />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{ width: 240, flexShrink: 0, "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" } }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}