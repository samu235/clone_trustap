import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { actions } = user;
export default user.reducer;