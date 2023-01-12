import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showCart: false,
    notifications: {
        status: '',
        message: '',
        title: ''
    }
};

const uiSlicer = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showCart(state) {
            state.showCart = !state.showCart;
        },
        setNotification(state, action) {
            state.notifications.status = action.payload.status;
            state.notifications.message = action.payload.message;
            state.notifications.title = action.payload.title;
        }
    }
});

export const uiActions = uiSlicer.actions;

export default uiSlicer.reducer;