import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface OrderState {
  currentOrder: any;
  myOrders: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  myOrders: [],
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData: any, { getState }) => {
  const state = getState() as any;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (state.auth.token) {
    headers['Authorization'] = `Bearer ${state.auth.token}`;
  }

  const response = await fetch('/api/orders/', {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create order');
  }
  return response.json();
});

export const trackOrder = createAsyncThunk('orders/trackOrder', async (orderNumber: string, { getState }) => {
  const state = getState() as any;
  const headers: Record<string, string> = {};
  if (state.auth.token) {
    headers['Authorization'] = `Bearer ${state.auth.token}`;
  }

  const response = await fetch(`/api/orders/track/${orderNumber}`, { headers });
  if (!response.ok) {
    throw new Error('Order not found');
  }
  return response.json();
});

export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async (_, { getState }) => {
  const state = getState() as any;
  const headers: Record<string, string> = {};
  if (state.auth.token) {
    headers['Authorization'] = `Bearer ${state.auth.token}`;
  }

  const response = await fetch(`/api/orders/my`, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
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
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

export default ordersSlice.reducer;
