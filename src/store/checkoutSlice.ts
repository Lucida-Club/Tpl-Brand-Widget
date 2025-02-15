import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SearchResult } from '../types';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
}

interface CheckoutState {
  product: SearchResult | null;
  quantity: number;
  formData: FormData | null;
}

const initialState: CheckoutState = {
  product: null,
  quantity: 1,
  formData: null,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<SearchResult>) => {
      state.product = action.payload;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
    resetCheckout: (state) => {
      state.product = null;
      state.quantity = 1;
      state.formData = null;
    },
  },
});

export const { setProduct, setQuantity, setFormData, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;