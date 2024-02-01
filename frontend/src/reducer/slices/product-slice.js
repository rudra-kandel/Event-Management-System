import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: false,
  productData: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.status = true;
      state.productData = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
