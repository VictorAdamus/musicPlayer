import {createSlice} from "@reduxjs/toolkit";

import {sounds} from "@/app/db/sounds.js";

const initialState = {
    playlist: false,
    isPlaying: false,
    currentTrack: sounds[0],
    tracks: sounds,
    mixFavoriteTrack: false,
    mixStartTrack: true,
    mixRandomTrack: false,
    favoriteTracks: [],
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlaylist: (state, action) => {
            state.playlist = action.payload
        },
        togglePlay: (state, action) => {
            state.isPlaying = action.payload
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
        setTracksMix: (state) => {
            state.mixFavoriteTrack = false
            state.mixStartTrack = false
            state.mixRandomTrack = true
            const soundArr = state.tracks.slice()
            for (let i = soundArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [soundArr[i], soundArr[j]] = [soundArr[j], soundArr[i]]
            }
            state.tracks = soundArr;
        },
        setTracksStart: (state) => {
            state.mixFavoriteTrack = false;
            state.mixStartTrack = true
            state.mixRandomTrack = false
            state.tracks = state.tracks.sort((a, b) => (a.title > b.title ? 1 : -1));
        },
        setTracksFavorite: (state) => {
            state.mixFavoriteTrack = true;
            state.mixStartTrack = false
            state.mixRandomTrack = false
        },
        addToFavoriteTrack: (state, action) => {
            state.tracks.map(track => {track.id === action.payload ? track.favorite = true : ''})
            state.favoriteTracks = state.tracks.filter((track)=> track.favorite)
        },
        removeFavoriteTrack: (state, action)=>{
           state.tracks.map(track => {track.id === action.payload ? track.favorite = false : ''})
           state.favoriteTracks = state.tracks.filter((track)=> track.favorite)
        },
    }
})

export const {setPlaylist, setCurrentTrack, togglePlay, setTracksMix, setTracksStart, setTracksFavorite, addToFavoriteTrack, removeFavoriteTrack} = playerSlice.actions
export default playerSlice.reducer
