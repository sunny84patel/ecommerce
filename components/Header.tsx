"use client";

import { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon, ArrowBackIos, ArrowForwardIos, Brightness4, Brightness7, Notifications } from "@mui/icons-material";
import { useTheme } from "next-themes";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "white", color: "black", borderBottom: "1px solid #ddd" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Sidebar Toggle */}
        <IconButton onClick={toggleSidebar} sx={{ color: "black" }}>
          {isSidebarOpen ? <ArrowBackIos /> : <ArrowForwardIos />}
        </IconButton>

        {/* Logo */}


        {/* Actions: Theme Toggle, Notifications, User Profile */}
        <Box display="flex" alignItems="center">
          {/* Dark Mode Toggle */}
          <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} sx={{ color: "black" }}>
            {mounted && theme === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {/* Notifications */}
          <IconButton sx={{ color: "black" }}>
            <Notifications />
          </IconButton>

          {/* User Profile */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: "blue" }}>S</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>

          {/* User Name & Email */}
          <Box ml={1}>
            <Typography variant="body1" fontWeight="bold">
              Sunny Patel
            </Typography>
            <Typography variant="body2" color="gray">
              Patel844732sunny@gmail.com
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
