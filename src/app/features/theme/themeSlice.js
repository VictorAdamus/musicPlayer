import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkTheme: false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkTheme: (state) => {
            state.darkTheme = !state.darkTheme
        },
    }
})

export const { setDarkTheme} = themeSlice.actions
export default themeSlice.reducer
