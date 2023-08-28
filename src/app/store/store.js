import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../features/player/playerSlice";
import musicSlice from "../features/music/musicSlice";
import themeSlice from "../features/theme/themeSlice";

export const store = configureStore({
    reducer: {
        player: playerSlice,
        music: musicSlice,
        theme: themeSlice,
    },
})