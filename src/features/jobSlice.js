import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobs = createAsyncThunk("job/getJobs", async (thunkAPI) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/jobs/`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
