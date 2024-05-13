import { createSlice } from '@reduxjs/toolkit';
import { loadUserThunk } from './thunk';

const initialState = {};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload?.userId || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserThunk.fulfilled, (state, action) => {
      state.userId = action.payload?.userId || null;
      state.token = action.payload?.token || null;
      state.admin = action.payload?.admin || null;
    })
  },
});

export const { setUser } = slice.actions
export const user = slice.reducer;