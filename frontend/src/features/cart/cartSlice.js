import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addtoCart, deleteItemById, fetchItemByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  items:[],
  status: 'idle',
  cartLoaded: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const addtoCartAsync = createAsyncThunk(
  'cart/addtoCart',
  async (item) => {
    const response = await addtoCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async(userId)=>{
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async(update)=>{
    const response = await updateCart(update);
    return response.data;
  }
)

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItem',
  async(id)=>{
    const response = await deleteItemById(id);
    return response.data;
  }
)

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async(userId)=>{
    const response = await resetCart(userId);
    return response.data;
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(addtoCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtoCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index] = action.payload ;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       state.items = [];
      })
      
  },
});

// export const { increment } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
