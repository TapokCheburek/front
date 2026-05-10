import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface OrderState {
  currentOrder: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData: any) => {
  const response = await fetch('/api/orders/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create order');
  }
  return response.json();
});

export const trackOrder = createAsyncThunk('orders/trackOrder', async (orderNumber: string) => {
  const response = await fetch(`/api/orders/track/${orderNumber}`);
  if (!response.ok) {
    throw new Error('Order not found');
  }
  return response.json();
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error occurred';
      })
      .addCase(trackOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(trackOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Order not found';
      });
  },
});

export default ordersSlice.reducer;
