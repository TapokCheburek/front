import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types';

interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  currentProductStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  currentProductStatus: 'idle',
  status: 'idle',
  error: null,
};

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string) => {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Failed to fetch product');
  }
  return await response.json();
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filters?: Record<string, any>) => {
  let url = '/api/products/';
  if (filters) {
    const params = new URLSearchParams();
    if (filters.minPrice) params.append('min_price', filters.minPrice);
    if (filters.maxPrice) params.append('max_price', filters.maxPrice);
    if (filters.minPower) params.append('min_power', filters.minPower);
    if (filters.maxPower) params.append('max_power', filters.maxPower);
    if (filters.lampType && filters.lampType !== 'Тип лампочки') params.append('type', filters.lampType);
    if (filters.baseType && filters.baseType !== 'Тип цоколя') params.append('socket', filters.baseType);
    if (filters.inStock) params.append('in_stock', 'true');
    
    const queryString = params.toString();
    if (queryString) {
      url += '?' + queryString;
    }
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error occurred';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.currentProductStatus = 'loading';
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProductStatus = 'succeeded';
        state.currentProduct = action.payload;
        // Also update items array if it exists
        if (action.payload) {
          const index = state.items.findIndex(p => p.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          } else {
            state.items.push(action.payload);
          }
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentProductStatus = 'failed';
        state.error = action.error.message || 'Error occurred';
      });
  },
});

export default productsSlice.reducer;
