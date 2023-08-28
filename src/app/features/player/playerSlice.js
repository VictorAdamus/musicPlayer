import {createSlice} from "@reduxjs/toolkit";

import {sounds} from "@/app/db/db.js";

const initialState = {
    playlist: false,
    isPlaying: false,
    currentTrack: sounds[0],
    tracks: sounds,
    mixFavoriteTrack: false,
    mixStartTrack: true,
    mixRandomTrack: false

}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlaylist: (state) => {
            state.playlist = !state.playlist
        },
        setPlay: (state) => {
            state.isPlaying = true
        },
        setPause: (state) => {
            state.isPlaying = false
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
        setTracksMix: (state) => {
            state.mixFavoriteTrack = false
            state.mixStartTrack = false
            state.mixRandomTrack = true
            const soundArr = state.originalTracks? state.originalTracks.slice() : state.tracks;
            for (let i = soundArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [soundArr[i], soundArr[j]] = [soundArr[j], soundArr[i]]
            }
            console.log(`mix :  ${ state.tracks }`);
            state.tracks = soundArr;
        },
        setTracksStart: (state) => {
            state.mixFavoriteTrack = false;
            state.mixStartTrack = true
            state.mixRandomTrack = false
            state.tracks = state.originalTracks? state.originalTracks.slice() : state.tracks; 
            state.tracks.sort((a, b) => (a.title > b.title ? 1 : -1));


        },
        setTracksFavorite: (state) => {
            state.mixFavoriteTrack = true;
            state.mixStartTrack = false
            state.mixRandomTrack = false
            state.originalTracks = state.tracks.slice(); 
            const soundArr = state.tracks.filter((item) => item.favorite === true);
            state.tracks = soundArr;
        },
        addToFavoriteTrack: (state, action) => {
            const item = state.tracks.find(track => track.id === action.payload)
            if (item) {
                item.favorite = !item.favorite;
            }
        }
    }
})

export const {setPlaylist, setCurrentTrack, setPlay, setPause, setTracksMix, setTracksStart, setTracksFavorite, addToFavoriteTrack} = playerSlice.actions
export default playerSlice.reducer
