
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import geminiReducer from './features/gemini/geminiSlice';
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    user: userReducer,

    gemini: geminiReducer,

    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser', 'jwtAuth/initializeAuth'],
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['jwtAuth.user'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;