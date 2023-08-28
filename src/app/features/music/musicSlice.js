import { createSlice } from "@reduxjs/toolkit";

import { sounds } from "@/app/db/db.js";

const initialState = {
    tracks: sounds,
    currentTrack: sounds[0],
    policeMode: false,
}

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
        setPoliceMode: (state) => {
            state.policeMode = !state.policeMode
        },
    }
})

export const { setIsPlaying, setCurrentTrack, setPoliceMode} = musicSlice.actions
export default musicSlice.reducer
