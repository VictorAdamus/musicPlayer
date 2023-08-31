import Image from 'next/image'
import pauseImg from './img/pause.png'
import prevImg from './img/prev.png'
import playImg from './img/play.png'
import {backgrounds} from './db/background.js'
import './Player.css'

import {useEffect, useRef, useState, useCallback} from 'react'
import {useSwipeable} from 'react-swipeable'

import {useSelector, useDispatch} from 'react-redux'
import {setCurrentTrack, togglePlay, setPlaylist} from './features/player/playerSlice'
import Playlist from './components/Playlist'



function Player() {

  const handler = useSwipeable({
    onSwipedLeft: () => {nextTrack()},
    onSwipedRight: () => {prevTrack()},
    onSwipedDown: ()=>{
      playlistToogle(true)
    },
    onSwipedUp: (eventData)=>{
      if(eventData.event.target.id !== '000') {
        playlistToogle(false)
      }
    }
  })

  const isPlaying = useSelector(state => state.player.isPlaying)
  const currentTrack = useSelector(state => state.player.currentTrack)
  const sounds = useSelector(state => state.player.tracks)
  const playlist = useSelector((state) => state.player.playlist)
  const mixFavoriteTrack = useSelector((state) => state.player.mixFavoriteTrack)
  const favoriteTracks = useSelector((state) => state.player.favoriteTracks)

  const randomBackground = (arr) => {
    const randomColor = arr[Math.floor(Math.random() * arr.length)]
    return randomColor
  }

  const [color, setColor] = useState(backgrounds[0])
  const [animationPrev, setAnimationPrev] = useState(false)
  const [animationNext, setAnimationNext] = useState(false)

  const dispatch = useDispatch()


  const trackRef = useRef();
  const clickRef = useRef();
  const minRefStart = useRef();
  const secRefStart = useRef();
  const minRefEnd = useRef();
  const secRefEnd = useRef();


  const setPlaying = () => {
    dispatch(togglePlay(true))
  }

  const setPaused = () => {
    dispatch(togglePlay(false))
  }

  const toggleCurrentTrack = useCallback((track)=> {
    dispatch(setCurrentTrack(track))
  },[dispatch])

  useEffect(() => {
    minRefStart.current.textContent = trackMin(trackRef.current.currentTime)
    secRefStart.current.textContent = trackSec(trackRef.current.currentTime)
    minRefEnd.current.textContent = trackMin(trackRef.current.duration)
    secRefEnd.current.textContent = trackSec(trackRef.current.duration)
  }, [currentTrack])

  const prevTrack = () => {
    if(mixFavoriteTrack && favoriteTracks.length < 1) {
      toggleCurrentTrack(sounds[0])
      trackRef.current.currentTime = 0;
      setPlaying()
      setAnimationPrev(true)
      setColor(randomBackground(backgrounds))
      return
    }
    const tracks = (mixFavoriteTrack ? favoriteTracks : sounds)
    const indexTrack = tracks.findIndex(tracks => tracks.title == currentTrack.title)
    if (indexTrack == 0) {
      toggleCurrentTrack(tracks[tracks.length - 1])
    } else {

      toggleCurrentTrack(tracks[indexTrack - 1])
    }

    trackRef.current.currentTime = 0;
    setPlaying()
    setAnimationPrev(true)
    setColor(randomBackground(backgrounds))
  }

  const nextTrack = () => {
    if(mixFavoriteTrack && favoriteTracks.length < 1) {
      toggleCurrentTrack(sounds[0])
      trackRef.current.currentTime = 0;
      setPlaying()
      setAnimationNext(true)
      setColor(randomBackground(backgrounds))
      return
    }
    const tracks = (mixFavoriteTrack ? favoriteTracks : sounds)
    const indexTrack = tracks.findIndex(tracks => tracks.title == currentTrack.title)
 
    if (indexTrack == tracks.length - 1) {
      toggleCurrentTrack(tracks[0])
    } else {
      toggleCurrentTrack(tracks[indexTrack + 1])
    }

    trackRef.current.currentTime = 0;
    setPlaying()
    setAnimationNext(true)
    setColor(randomBackground(backgrounds))
  }

  const onPlaying = useCallback(() => {
    const duration = trackRef.current.duration;
    const curTime = trackRef.current.currentTime;
    toggleCurrentTrack({...currentTrack, 'progress': curTime / duration * 100, length: duration});
  }, [currentTrack, toggleCurrentTrack, trackRef])

  const playlistToogle = (state) => {
    dispatch(setPlaylist(state))
  }

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    const progress = offset / width * 100
    trackRef.current.currentTime = progress / 100 * currentTrack.length
  }

  const trackSec = (dur) => {
    let seconds;
    if (dur) {
      seconds = Math.floor(dur % 60)
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
    } else {
      seconds = '00'
    }

    return seconds
  }

  const trackMin = (dur) => {
    let minutes;
    if (dur) {
      minutes = '0' + Math.floor(dur / 60)
    } else {
      minutes = '00'
    }
    return minutes
  }

  console.log('render');

  useEffect(() => {
    if (isPlaying) {
      trackRef.current.play();
    } else {
      trackRef.current.pause();
    }
  }, [isPlaying, currentTrack])


  return (
    <div {...handler} style={{overflowX: "scroll"}} className={`h-[100%] min-h-[100vh] relative w-[100%] ${ color } py-0 pb-10 flex flex-col justify-between  items-center shadow-xl`}>
      <div className={`flex flex-col items-center justify-center gap-1 shadow-2xl shadow-black bg-slate-800/50 w-32 h-8 rounded-b-md cursor-pointer z-10`} onClick={()=>{playlistToogle(playlist? false : true)}}>
        <span className={`h-[2px] w-1/2 bg-slate-400 duration-300 ${playlist ? 'translate-y-3' : ''}`}></span>
        <span className={`h-[2px] w-1/2  shadow-[0_0_5px_1px_rgba(255,255,255,0.05)]  duration-300 ${playlist ? 'bg-red-400 shadow-red-400' : 'bg-lime-400 shadow-lime-400'}`}></span>
        <span className={`h-[2px] w-1/2 bg-slate-400 duration-300 ${playlist ? '-translate-y-3' : ''}`}></span>
      </div>
      <div className={`${animationNext && 'fade-next'} ${animationPrev && 'fade-prev'} rounded-full w-52 h-52 bg-black flex flex-col items-center justify-center relative ${ (isPlaying && trackRef.current.currentTime) && 'animate-lazySpin' }`}  onAnimationEnd={()=>{
      setAnimationNext(false)
      setAnimationPrev(false)}}>
        <Image className='object-fill rounded-full' src={currentTrack.img} alt={currentTrack.author} width={160} height={160} />
        <div className={`rounded-full w-10 h-10 outline outline-1 outline-white  absolute border-black border-8 bg-slate-300`}></div>
      </div>
      <div className={`${animationNext && 'fade-next'} ${animationPrev && 'fade-prev'} w-3/4`} onAnimationEnd={()=>{
      setAnimationNext(false)
      setAnimationPrev(false)}}>
        <div className={`text-slate-300 text-xl text-center ${ (isPlaying && trackRef.current.currentTime) && 'animate-bounce' }`}>{currentTrack.title}</div>
        <div className={`text-slate-400 text-sm text-center ${ (isPlaying && trackRef.current.currentTime) && 'animate-bounce' }`}>{currentTrack.author}</div>
      </div>
      <audio ref={trackRef} src={currentTrack.src} type='audio/mp3' onTimeUpdate={onPlaying} onEnded={nextTrack} />
      <div className='w-10/12 flex flex-col'>
        <div className="flex w-full h-12 justify-start items-end gap-1 mb-4">
          <div className={`w-1/12 h-0 opacity-20 bg-slate-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown1' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-stone-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown2' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-red-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown3' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-orange-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown4' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-yellow-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown5' }`}></div>
          <div className={`w-1/12 h-0 opacity-20  bg-lime-100  ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown1' }`}></div>
          <div className={`w-1/12 h-0 opacity-20  bg-teal-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown1' }`}></div>
          <div className={`w-1/12 h-0 opacity-20  bg-cyan-100  ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown2' }`}></div>
          <div className={`w-1/12 h-0 opacity-20  bg-blue-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown3' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-purple-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown4' }`}></div>
          <div className={`w-1/12 h-0 opacity-20  bg-fuchsia-100 ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown5' }`}></div>
          <div className={`w-1/12 h-0 opacity-20  bg-pink-100  ${ (isPlaying && trackRef.current.currentTime) && 'animate-upDown1' }`}></div>
        </div>
        <div className='flex h-1 bg-gray-600 rounded-lg items-center justify-start cursor-pointer' onClick={checkWidth} ref={clickRef} >
          <div className='h-1 bg-sky-700 rounded-lg opacity-100 relative' style={{width: `${ currentTrack.progress + '%' }`}}>
            <div className='rounded-full w-4 h-4 absolute end-0 top-[-6px] bg-white'></div>
          </div>
        </div>
        <div className='flex justify-between mt-2 text-slate-400'>
          <p><span ref={minRefStart}></span>:<span ref={secRefStart}></span></p>
          <p><span ref={minRefEnd}></span>:<span ref={secRefEnd}></span></p>
        </div>
      </div>
      <div className='flex w-full items-center max-w-md justify-between mt-8 mb-4 px-10'>
        <button className='opacity-60  cursor-pointer p-0 w-12 h-12 duration-200 hover:scale-110 active:opacity-50' onClick={prevTrack}>
          <Image className='invert' src={prevImg} alt='prev track' />
        </button>
        <button className='opacity-60 cursor-pointer p-0 w-20 h-20 border-white border rounded-full shadow-xl shadow-black bg-black/40  duration-200 flex items-center justify-center hover:scale-110 active:opacity-50'>

          {isPlaying ? <Image className='invert' onClick={setPaused} src={pauseImg} alt='pause' width='46' height='auto' /> : <Image className='invert' onClick={setPlaying} src={playImg} alt='play' width='46' height='auto' />}

        </button>
        <button className='opacity-60  cursor-pointer p-0 w-12 h-12 duration-200 hover:scale-110 active:opacity-50' onClick={nextTrack}>
          <Image className='rotate-180 invert' src={prevImg} alt='next track' />
        </button>
      </div>
      <Playlist />
    </div>
  )
}

export default Player



