import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/candidate/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      const error = err.response.data.message;
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      const error = err.response.data.message;
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/candidate/logout`,
        credentials
      );
      return response.data;
    } catch (err) {
      const error = err.response.data.message;
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
