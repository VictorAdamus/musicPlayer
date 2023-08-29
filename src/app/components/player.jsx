import Image from 'next/image'
import pauseImg from '../img/pause.png'
import prevImg from '../img/prev.png'
import playImg from '../img/play.png'
import {useEffect, useRef} from 'react'
import {useSwipeable} from 'react-swipeable'

import {useSelector, useDispatch} from 'react-redux'
import {setCurrentTrack, setPlay, setPause, setPlaylist} from '../features/player/playerSlice'
import Playlist from '../Playlist'



function Player() {

  const handler = useSwipeable({
    onSwipedLeft: () => {nextTrack()},
    onSwipedRight: () => {prevTrack()}
  })



  const isPlaying = useSelector(state => state.player.isPlaying)
  const currentTrack = useSelector(state => state.player.currentTrack)
  const sounds = useSelector(state => state.player.tracks)
  const playlist = useSelector((state) => state.player.playlist)

  const dispatch = useDispatch()


  const trackRef = useRef();
  const clickRef = useRef();
  const minRefStart = useRef();
  const secRefStart = useRef();
  const minRefEnd = useRef();
  const secRefEnd = useRef();


  const setPlaying = () => {
    dispatch(setPlay())
  }

  const setPaused = () => {
    dispatch(setPause())
  }

  useEffect(() => {
    minRefStart.current.textContent = trackMin(trackRef.current.currentTime)
    secRefStart.current.textContent = trackSec(trackRef.current.currentTime)
    minRefEnd.current.textContent = trackMin(trackRef.current.duration)
    secRefEnd.current.textContent = trackSec(trackRef.current.duration)
  }, [currentTrack])


  const prevTrack = () => {
    const indexTrack = sounds.findIndex(sound => sound.title == currentTrack.title)
    if (indexTrack == 0) {
      dispatch(setCurrentTrack(sounds[sounds.length - 1]))
    } else {

      dispatch(setCurrentTrack(sounds[indexTrack - 1]))
    }

    trackRef.current.currentTime = 0;
    setPlaying()
  }

  const nextTrack = () => {
    const indexTrack = sounds.findIndex(sound => sound.title == currentTrack.title)
    if (indexTrack == sounds.length - 1) {
      dispatch(setCurrentTrack(sounds[0]))
    } else {
      dispatch(setCurrentTrack(sounds[indexTrack + 1]))
    }

    trackRef.current.currentTime = 0;
    setPlaying()
  }

  const onPlaying = () => {
    const duration = trackRef.current.duration;
    const curTime = trackRef.current.currentTime;

    dispatch(setCurrentTrack({...currentTrack, 'progress': curTime / duration * 100, length: duration}))

  }

  const playlistToogle = () => {
    dispatch(setPlaylist())
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

  useEffect(() => {
    if (isPlaying) {
      trackRef.current.play();
    } else {
      trackRef.current.pause();
    }
  }, [isPlaying, currentTrack])


  return (
    <div {...handler} style={{overflowX: "scroll"}} className={` h-screen relative w-full max-h-min p-4 py-10 pb-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-400 from-5% via-indigo-800  via-40%  to-black to-80% flex flex-col justify-between  items-center shadow-xl`}>

      <div className='text-sm mb-4'>Now Playing</div>
      <div className={`rounded-full w-52 h-52 bg-black flex flex-col items-center justify-center relative ${ isPlaying && 'animate-lazySpin' }`}>
        <Image className='rounded-full' src={currentTrack.img} alt={currentTrack.author} width={160} height={160} />
        <div className={`rounded-full w-8 h-8  absolute border border-black bg-purple-200`}></div>
      </div>
      <div className='w-2/3 mt-24'>
        <div className={`text-slate-400 text-md text-center ${ isPlaying && 'animate-bounce' }`}>{currentTrack.title}</div>
      </div>
      <audio ref={trackRef} src={currentTrack.src} type='audio/mp3' onTimeUpdate={onPlaying} onEnded={nextTrack} />
      <div className='w-10/12 flex flex-col'>
        <div className="flex w-full h-12 justify-start items-end gap-1 mb-4">
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-fuchsia-400 via-purple-600 to-violet-500 shadow-2xl shadow-fuchsia-400 ${ isPlaying && 'animate-upDown1' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-lime-300 via-green-500 to-emerald-500 shadow-2xl shadow-lime-400 ${ isPlaying && 'animate-upDown2' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-teal-300 via-cyan-500 to-sky-400 shadow-2xl shadow-teal-300 ${ isPlaying && 'animate-upDown3' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-600 shadow-2xl shadow-pink-300 ${ isPlaying && 'animate-upDown4' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 shadow-2xl shadow-yellow-300 ${ isPlaying && 'animate-upDown5' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-fuchsia-400 via-purple-600 to-violet-500 shadow-2xl shadow-fuchsia-400 ${ isPlaying && 'animate-upDown1' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-fuchsia-400 via-purple-600 to-violet-500 shadow-2xl shadow-fuchsia-400 ${ isPlaying && 'animate-upDown1' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-lime-300 via-green-500 to-emerald-500 shadow-2xl shadow-lime-400 ${ isPlaying && 'animate-upDown2' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-teal-300 via-cyan-500 to-sky-400 shadow-2xl shadow-teal-300 ${ isPlaying && 'animate-upDown3' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-600 shadow-2xl shadow-pink-300 ${ isPlaying && 'animate-upDown4' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 shadow-2xl shadow-yellow-300 ${ isPlaying && 'animate-upDown5' }`}></div>
          <div className={`w-1/12 h-0 opacity-20 bg-gradient-to-r from-fuchsia-400 via-purple-600 to-violet-500 shadow-2xl shadow-fuchsia-400 ${ isPlaying && 'animate-upDown1' }`}></div>
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
        <button className='opacity-60  cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50' onClick={prevTrack}>
          <Image className='invert' src={prevImg} alt='prev track' />
        </button>
        <button className='opacity-60 cursor-pointer p-0 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 from-5% via-blue-800 via-40% to-gray-900 to-90% duration-200 flex items-center justify-center hover:scale-110 active:opacity-50'>

          {isPlaying ? <Image className='invert' onClick={setPaused} src={pauseImg} alt='pause' width='56' height='auto' /> : <Image className='invert' onClick={setPlaying} src={playImg} alt='play' width='56' height='auto' />}

        </button>
        <button className='opacity-60  cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50' onClick={nextTrack}>
          <Image className='rotate-180 invert' src={prevImg} alt='next track' />
        </button>
      </div>
      <div className='flex flex-col items-center justify-center bg-gradient-to-r z-10 from-slate-900 via-blue-900 to-slate-900 w-32 h-12 rounded-t-xl bg-lime-300 cursor-pointer' onClick={playlistToogle}>
        <span className='w-12 h-[2px] bg-slate-500 mb-1'></span>
        <span className='w-12 h-[2px] bg-slate-500'></span>
        <p className='text-slate-400 duration-300 hover:scale-110'>{playlist? 'close' : 'playlist'}</p>
      </div>
      <Playlist />
    </div>
  )
}

export default Player



