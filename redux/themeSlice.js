import { createSlice } from "@reduxjs/toolkit";



const themeSlice = createSlice({
    name : "theme",
    initialState : {
        themeMode : "light",
    },
    reducers : {
        setThemeMode : (state) => {
            state.themeMode = state.themeMode === "light" ? "dark" : "light";
        },  
    },



})

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;

