import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showCart: false,
    cartData: [],
};

const cartSlicer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        showCart(state) {
            state.showCart = !state.showCart;
        },
    }
});

export const cartActions = cartSlicer.actions;

export default cartSlicer.reducer;