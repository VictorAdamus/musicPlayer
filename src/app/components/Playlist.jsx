'use client'

import Image from 'next/image'
import favoriteTrackOff from '../../../public/icons/favoriteOff.png'

import {useDispatch, useSelector} from 'react-redux'
import {setCurrentTrack, setPlay, setTracksMix, setTracksStart, setTracksFavorite, addToFavoriteTrack, removeFavoriteTrack, setPlaylist} from '../features/player/playerSlice'



function Playlist() {



  const currentTrack = useSelector((state) => state.player.currentTrack)
  const tracks = useSelector((state) => state.player.tracks)
  const playlist = useSelector((state) => state.player.playlist)
  const mixStartTrack = useSelector((state) => state.player.mixStartTrack)
  const mixRandomTrack = useSelector((state) => state.player.mixRandomTrack)
  const mixFavoriteTrack = useSelector((state) => state.player.mixFavoriteTrack)
  const favoriteTracks = useSelector((state)=> state.player.favoriteTracks)

  const dispatch = useDispatch()
  const setPlaying = () => {
    dispatch(setPlay())
  }

  const tracksMixFavorite = () => {
    dispatch(setTracksFavorite())
  }
  const trackMixRandom = () => {
    dispatch(setTracksMix());
  };
  const trackMixStart = () => {
    dispatch(setTracksStart())
  }

  const playlistToggle = () => {
    dispatch(setPlaylist())
  }

  const addTrackFavorite = (itemId) => {
    dispatch(addToFavoriteTrack(itemId))
  }

  const removeTrackFavorite = (itemId)=>{
    dispatch(removeFavoriteTrack(itemId))
  }

  const findTrack = (element, arr) => {
    const title = element.textContent;
    const index = arr.findIndex(item => item.title === title)
    dispatch(setCurrentTrack(tracks[index]))
    setPlaying()
    setTimeout(()=>{playlistToggle(false)}, 1000)
    
  }

  return (
    <div id='000' className={`container max-w-md p-4 pt-12 pb-14 absolute top-0 rounded-b-xl flex flex-col justify-start items-center bg-slate-700/80 duration-500 shadow-2xl shadow-black ${ playlist ? 'h-[45%] opacity-100' : 'h-[0%] opacity-0' }`}>
      <div id='000' className='scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-800 container max-w-md mx-auto mt-2 grid gap-4 overflow-y-scroll'>
        {(mixFavoriteTrack ? favoriteTracks : tracks).map((track) => ( 
          <div id='000' className={`flex items-center text-white cursor-pointer mr-4 text-xs rounded-3xl hover:opacity-30 ${ track.title === currentTrack.title ? 'bg-slate-800/60' : '' }`} key={track.id}>
            <div id='000' className='flex items-center gap-6 pr-8' onClick={(e) => {findTrack(e.currentTarget, tracks)}}>
            <Image id='000' className='rounded-full' src={track.img} alt={track.author} width={50} height={50}></Image>
              {track.title}
            </div>
            <div id='000' className='ml-auto mr-5 p-2' onClick={() => {track.favorite? removeTrackFavorite(track.id): addTrackFavorite(track.id)}}>
              <Image id='000' className={`${track.favorite ? 'invert-[.50] sepia-[.90] hue-rotate-60' : ''}`} src={favoriteTrackOff} alt='checkbox' width='15' height='15' />
            </div>
          </div>
        ))}
      </div>
      <div className={`border border-gray-500  cursor-pointer flex items-center gap-8 justify-center w-fit p-2 absolute bottom-2`}>
        <Image className={`${ mixStartTrack ? 'invert-[.50] sepia-[.90] hue-rotate-60' : '' }`} src='/icons/aA.png' alt='alphabet' width='20' height='20' onClick={trackMixStart} />
        <Image className={`${ mixRandomTrack ? 'invert-[.50] sepia-[.90] hue-rotate-60' : '' }`} src='/icons/mix.png' alt='mix' width='20' height='20' onClick={trackMixRandom} />
        <Image className={`${ mixFavoriteTrack ? 'invert-[.50] sepia-[.90] hue-rotate-60' : '' }`} src={favoriteTrackOff} alt='favorite' width='20' height='20' onClick={tracksMixFavorite} />
      </div>
    </div>
  )
        }

export default Playlist