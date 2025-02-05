import {configureStore} from "@reduxjs/toolkit"; 
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import searchReducer from "./searchSlice"
import themeReducer from "./themeSlice"

const store = configureStore({
    reducer : {
        cart : cartReducer,
        product : productReducer,
        search : searchReducer,
        theme : themeReducer,
    }

});


export default store;


