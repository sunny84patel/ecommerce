"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgba(43,55,85,1) 0%, rgba(17,24,39,1) 100%)", // Sleek dark gradient
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          background: "rgba(255, 255, 255, 0.1)", // Transparent frosted effect
          backdropFilter: "blur(15px)", // Frosted glass effect
          WebkitBackdropFilter: "blur(15px)", // Safari support
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
          boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.1)", // Soft glow
        }}
      >
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="white">
          Welcome Back 👋
        </Typography>
        <Typography variant="body1" align="center" color="rgba(255, 255, 255, 0.7)" gutterBottom>
          Sign in to continue
        </Typography>

        {/* Login Form */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Email Field */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.2)", // Light transparent fields
                color: "white",
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)", // Soft white border
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
            }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.2)", // Light transparent fields
                color: "white",
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)", // Soft white border
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 1,
              background: "rgba(255, 255, 255, 0.3)",
              color: "white",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>

        {/* Divider */}
        <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.6)" sx={{ mt: 2, mb: 2 }}>
          ─ OR ─
        </Typography>

        {/* Don't have an account? */}
        <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.8)">
          Don't have an account?{" "}
          <Link
            href="/signup"
            style={{ color: "#90CAF9", fontWeight: "bold", textDecoration: "none" }}
          >
            Create an account
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
