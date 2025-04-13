import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../features/authSlice";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Spinner from "../Spinner";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, isAuth } = useAuthGuard();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (loading) {
    return <Spinner />;
  }

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
          Welcome back
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginBottom: 3, color: "#4B5563" }}
        >
          Login to your Acme Inc account.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email Address"
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                  color: "#FBBF24",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Link>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#FBBF24",
                  fontWeight: 500,
                }}
              >
                Register
              </Link>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#09090B",
                borderRadius: "12px",
                paddingY: 1.5,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#1C1C1E" },
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </form>

        {error && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{ marginTop: 2 }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
