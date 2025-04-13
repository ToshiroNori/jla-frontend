import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  LocationOn,
  Business,
} from "@mui/icons-material";
import { register } from "@/features/authSlice"; // <-- adjust your path if needed

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    companySize: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(register(formData)).unwrap(); // assuming your `register` is an asyncThunk
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Box className="min-h-screen flex justify-center items-center bg-[#F9F9F9] p-4">
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 450,
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: "#09090B" }}
        >
          Create Account
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginBottom: 3, color: "#4B5563" }}
        >
          Join us and start your journey.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email Address"
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Location"
              variant="outlined"
              name="location"
              fullWidth
              required
              value={formData.location}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Company Size"
              variant="outlined"
              name="companySize"
              fullWidth
              required
              value={formData.companySize}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "#09090B",
                borderRadius: "12px",
                paddingY: 1.5,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#1C1C1E" },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
