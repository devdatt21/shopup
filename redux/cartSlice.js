
import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : [],

        totalQuantity : 0,
        totalPrice : 0,
    },
    reducers : {
        addToCart : (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            
            if(item){
                item.quantity++;
            }
            else
            {
                state.items.push({...action.payload, quantity : 1});
            }

            state.totalQuantity++;
            state.totalPrice += action.payload.price;
        },
        decreaseQuantity : (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    state.items = state.items.filter((i) => i.id !== action.payload.id);
                }

                state.totalQuantity--;
                state.totalPrice -= action.payload.price;
            }
            
            

        }
    }
})



export const {addToCart, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
