import { createSlice } from "@reduxjs/toolkit";

import { sounds } from "@/app/db/sounds.js";

const initialState = {
    tracks: sounds,
    currentTrack: sounds[0],
}

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
    }
})

export const { setIsPlaying, setCurrentTrack} = musicSlice.actions
export default musicSlice.reducer
