'use client'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rootUser from './user/slice';

const rootReducer = combineReducers({
  user: rootUser,
  // otros reducers aquí...
});

const store = configureStore({
  reducer: rootReducer,
  // otras opciones como middleware, etc., si es necesario
});

export default store;