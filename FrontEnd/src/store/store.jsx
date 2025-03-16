import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import loadingReducer from "./slices/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    loading: loadingReducer,
  },
});

export default store;
