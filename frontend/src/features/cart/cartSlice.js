import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addtoCart, deleteItemById, fetchItemByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
  cartLoaded: false,
};

export const addtoCartAsync = createAsyncThunk(
  'cart/addtoCart',
  async (item) => {
    const response = await addtoCart(item);
    return response.data;
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async (userId) => {
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id) => {
    const response = await deleteItemById(id);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addtoCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtoCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (Array.isArray(state.items)) {
          state.items.push(action.payload);
        } else {
          state.items = [action.payload]; // Reset as array if corrupted
        }
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.cartLoaded = true;
      })
      .addCase(fetchItemByUserIdAsync.rejected, (state) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (Array.isArray(state.items)) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    })
    
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (Array.isArray(state.items)) {
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
