import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/users/userslice';
import orderReducer from  '../features/order/orderSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth :  authReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer
  },
});
