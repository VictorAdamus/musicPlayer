'use client'

import Image from 'next/image'
import {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setPlaylist, setCurrentTrack, setPlay, setTracksMix, setTracksStart, setTracksFavorite, addToFavoriteTrack} from './features/player/playerSlice'
import { setDarkTheme } from './features/theme/themeSlice'
import Player from './components/player'

import favoriteTrackOn from '../../public/icons/favoriteOn.png'
import favoriteTrackOff from '../../public/icons/favoriteOff.png'




function Music() {


  const isPlaying = useSelector((state) => state.player.isPlaying)
  const currentTrack = useSelector((state) => state.player.currentTrack)
  const policeMode = useSelector((state) => state.music.policeMode)
  const darkTheme = useSelector((state)=> state.theme.darkTheme)
  const tracks = useSelector((state)=> state.player.tracks)
  const playlist = useSelector((state)=> state.player.playlist)
  const mixFavoriteTrack = useSelector((state)=>state.player.mixFavoriteTrack)
  const mixStartTrack = useSelector((state)=>state.player.mixStartTrack)
  const mixRandomTrack = useSelector((state)=>state.player.mixRandomTrack)



  const dispatch = useDispatch()
  const setPlaying = () => {
    dispatch(setPlay())
  }
  const playlistToogle = () => {
    dispatch(setPlaylist())
  }

  const darkThemeHandler = () => {
    dispatch(setDarkTheme())
  }

const tracksFavoriteToggle = () => {
  dispatch(setTracksFavorite())
}

  const trackMixRandom = () => {
    dispatch(setTracksMix());
  };
  const trackMixStart = () => {
    dispatch(setTracksStart())
  }

  const handleToggleTrackToFavorite = (itemId) => {
    dispatch(addToFavoriteTrack(itemId))
  }



  

  console.log('re-render');

  
  const findTrack = (element, arr) => {
    const title = element.textContent;
    const index = arr.findIndex(item => item.title === title)
    dispatch(setCurrentTrack(tracks[index]))
    setPlaying()
    // playlistToogle()
  }

  // console.log(tracks);

    return (
        <div className={`w-screen duration-500 p-10 relative ${ darkTheme ? 'bg-black' : 'bg-gray-200' }`}>
            <div className='flex flex-row justify-center gap-16 rte:flex-col rte:gap-1 rte:justify-start rte:items-center'>
                <Player />
                <div className={`container max-w-md p-4 py-10 pb-10 flex  rounded flex-col justify-start items-center shadow-xl ${ darkTheme ? 'bg-gray-600' : 'bg-gray-300' } ${ isPlaying && policeMode && 'animate-colorPulseBlue' }`}>
                    <button className={`text-sm`} onClick={playlistToogle}>{playlist ? 'Hide Playlist' : 'Show Playlist'}</button>
                    {playlist && (<div className={`border border-gray-500  mt-2 cursor-pointer flex items-center gap-8 justify-center w-fit p-2 ${ darkTheme && 'bg-gray-600' }`}>
                        <Image className={`${mixStartTrack ? 'invert-[.50] sepia-[.90] hue-rotate-60' : ''}`} src='/icons/aA.png' alt='alphabet' width='20' height='20' onClick={trackMixStart} />
                        <Image className={`${mixRandomTrack ? 'invert-[.50] sepia-[.90] hue-rotate-60' : ''}`} src='/icons/mix.png' alt='mix' width='20' height='20' onClick={trackMixRandom} />
                        <Image className={`${mixFavoriteTrack ? 'invert-[.50] sepia-[.90] hue-rotate-60' : ''}`} src={favoriteTrackOff} alt='favorite' width='20' height='20' onClick={tracksFavoriteToggle}/>        
                    </div>)}
                    {playlist ? (<div className='container max-w-md mx-auto mt-6 grid gap-4 max-h-80 overflow-y-scroll'>

                        { tracks.map((track) => (
                            <p className={`flex items-center gap-4 cursor-pointer ${ darkTheme ? 'text-white' : 'text-black' } text-xs hover:opacity-30 ${ track.title === currentTrack.title ? 'animate-bounce font-bold' : '' }`} onClick={(e) => {findTrack(e.currentTarget, tracks)}} key={track.id}>
                              <Image src={track.img} alt={track.author} width={50} height={50}></Image>
                              {track.title}
                              <div className='ml-auto mr-5 p-2' onClick={()=>{handleToggleTrackToFavorite(track.id)}}>
                              <Image src={ track.favorite ? favoriteTrackOn : favoriteTrackOff} alt='checkbox' width='10' height='10'/>
                              </div>
                              </p>
                        ))}
                    </div>) : (<div className="flex w-full h-96 justify-start items-end gap-1">
                        <div className={`w-1/6 h-1 bg-gradient-to-r from-fuchsia-400 via-purple-600 to-violet-500 shadow-2xl shadow-fuchsia-400 ${ isPlaying && 'animate-upDown1' }`}></div>
                        <div className={`w-1/6 h-1 bg-gradient-to-r from-lime-300 via-green-500 to-emerald-500 shadow-2xl shadow-lime-400 ${ isPlaying && 'animate-upDown2' }`}></div>
                        <div className={`w-1/6 h-1 bg-gradient-to-r from-teal-300 via-cyan-500 to-sky-400 shadow-2xl shadow-teal-300 ${ isPlaying && 'animate-upDown3' }`}></div>
                        <div className={`w-1/6 h-1 bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-600 shadow-2xl shadow-pink-300 ${ isPlaying && 'animate-upDown4' }`}></div>
                        <div className={`w-1/6 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 shadow-2xl shadow-yellow-300 ${ isPlaying && 'animate-upDown5' }`}></div>
                        <div className={`w-1/6 h-1 bg-gradient-to-r from-fuchsia-400 via-purple-600 to-violet-500 shadow-2xl shadow-fuchsia-400 ${ isPlaying && 'animate-upDown1' }`}></div>
                    </div>)}

                </div>
                <div className={`w-10 h-10 cursor-pointer absolute right-10 top-12 duration-200 hover:scale-110 ${ isPlaying && 'animate-bounce' }`} onClick={darkThemeHandler}>
                    {darkTheme ? <Image src='/icons/moon.png' alt='dark-theme' width='40' height='40' /> : <Image src='/icons/day.png' alt='light theme' width='40' height='40' />}
                </div>
            </div>
        </div>
    )
}

export default Music