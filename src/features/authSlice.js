import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

// Login action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/candidate/login`,
        credentials
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data?.message || "An error occurred.";
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Fetch user data
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/candidate`
    );
    return response.data;
  } catch (err) {
    const error =
      err.response?.data?.message || err.message || "An error occurred.";
    return thunkAPI.rejectWithValue(error);
  }
});

// Register action
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/candidate/register`,
        credentials
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data?.message || "An error occurred.";
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Logout action
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/candidate/logout`
    );
    return response.data;
  } catch (err) {
    const error = err.response?.data?.message || "An error occurred.";
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    error: null,
    loading: true,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login action
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.error = null; // Clear error on successful login
        toast.success("Login Success");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Login failed");
      })

      // Register action
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null; // Clear error on successful register
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout action
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuth = false;
        state.error = null; // Clear error on successful logout
        toast.success("Logout Success");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })

      // Get user action (handles auth check)
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuth = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
