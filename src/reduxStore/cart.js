import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalQuantitiy: 0,
    cartData: [],
};

const cartSlicer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart(state, action) {
            const item = action.payload;
            const itemID = item.id;
            // console.log('add id-', itemID)
            const presentIdx = state.cartData.findIndex(key => key.id === itemID);
            // console.log('add pos-', presentIdx)
            state.totalQuantitiy++;
            if (presentIdx > -1) {
                state.cartData[presentIdx].quantity++;
                state.cartData[presentIdx].totalAmt = state.cartData[presentIdx].totalAmt + item.price;
            } else {
                state.cartData.push({
                    id: item.id,
                    price: item.price,
                    title: item.title,
                    quantity: 1,
                    totalAmt: item.price
                })
            }
        },
        removeCart(state, action) {
            const itemID = action.payload;
            // console.log('remove id-', itemID)
            const presentIdx = state.cartData.findIndex(key => key.id === itemID);
            state.totalQuantitiy--;
            // console.log('rem pos-', presentIdx)
            const availableQtn = state.cartData[presentIdx].quantity;
            if (availableQtn > 1) {
                state.cartData[presentIdx].quantity--;
                state.cartData[presentIdx].totalAmt = state.cartData[presentIdx].totalAmt - state.cartData[presentIdx].price;
            } else {
                state.cartData.splice(presentIdx, 1)
            }
        },
        createCart(state, action) {
            // console.log(action.payload)
            state.totalQuantitiy = action.payload.totalQuantitiy;
            state.cartData = action.payload.cartData;
        },
        clearCart(state) {
            state.totalQuantitiy = 0;
            state.cartData = [];
        }
    }
});

export const cartActions = cartSlicer.actions;

export default cartSlicer.reducer;