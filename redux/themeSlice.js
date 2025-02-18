import { createSlice } from "@reduxjs/toolkit";



const themeSlice = createSlice({
    name : "theme",
    initialState : {
        themeMode : "dark",
    },
    reducers : {
        setThemeMode : (state,actions) => {
            state.themeMode = actions.payload === "light" ? "light" : "dark";
        },  
    },



})

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;

