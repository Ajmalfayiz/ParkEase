import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spots: [],
  loading: false,
  error: null,
};

const spotSlice = createSlice({
  name: "spots",
  initialState,
  reducers: {
    fetchSpotsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSpotsSuccess: (state, action) => {
      state.loading = false;
      state.spots = action.payload;
      state.error = null;
    },
    fetchSpotsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSpotsStart,
  fetchSpotsSuccess,
  fetchSpotsFailure,
} = spotSlice.actions;

export default spotSlice.reducer;
