
import { createSlice } from "@reduxjs/toolkit";
// import { cloneDeep } from "lodash";

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
        },
        setCart : (state,action) => {


            state.items = Array.isArray(action.payload) ? action.payload : [];

            //state is unreadable because redux updates the state in batches using 
            //proxy 

            //so we have to first make deep copy of state to log the actual state 

            //first serialize and then deserialize 

            //serialize : converts state into string represantation ( removes all the 
            // extra objects like proxies, functions and objects like map, set, undefined)

            //deserialize : convert back it into new JS object 

            console.log("Updated cart state:", JSON.parse(JSON.stringify(state))); 

            
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);

            state.totalPrice = state.items.reduce((total, item) => total + (item.quantity * item.price), 0);
        }
    }
})



export const {addToCart, decreaseQuantity, setCart} = cartSlice.actions;
export default cartSlice.reducer;
