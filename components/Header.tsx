"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Brightness4,
  Brightness7,
  Notifications,
} from "@mui/icons-material";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        color: "black",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          px: { xs: 1, sm: 2 },
        }}
      >
        {/* Sidebar Toggle */}
        <IconButton onClick={toggleSidebar} sx={{ color: "black" }}>
          {isSidebarOpen ? <ArrowBackIos /> : <ArrowForwardIos />}
        </IconButton>

        {/* Actions: Theme Toggle, Notifications, User Profile or Login */}
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }} flexWrap="wrap">
          {/* Dark Mode Toggle */}
          <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} sx={{ color: "black" }}>
            {mounted && theme === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {/* Notifications */}
          <IconButton sx={{ color: "black" }}>
            <Notifications />
          </IconButton>

          {session ? (
            <>
              {/* User Avatar */}
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  src={session.user?.image || ""}
                  sx={{
                    bgcolor: "blue",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                  }}
                >
                  {session.user?.name?.charAt(0) || "U"}
                </Avatar>
              </IconButton>

              {/* User Menu */}
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </Menu>

              {/* User Info - Hide Email on Small Screens */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                <Typography variant="body1" fontWeight="bold" noWrap>
                  {session.user?.name}
                </Typography>
                <Typography variant="body2" color="gray" noWrap sx={{ display: { xs: "none", sm: "block" } }}>
                  {session.user?.email}
                </Typography>
              </Box>
            </>
          ) : (
            // Login Button
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/login")}
              sx={{
                background: "rgba(255, 255, 255, 0.3)",
                color: "black",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                py: { xs: 0.8, sm: 1 },
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
