import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload?.userId || null;
    },
  },
});

export const { setUser } = slice.actions
export const user = slice.reducer;