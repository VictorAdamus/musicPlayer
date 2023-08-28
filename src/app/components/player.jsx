import Image from 'next/image'
import pauseImg from '../img/pause.png'
import prevImg from '../img/prev.png'
import playImg from '../img/play.png'
import {useEffect, useRef, useState} from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {setCurrentTrack, setPlay, setPause} from '../features/player/playerSlice'
import { setPoliceMode } from '../features/music/musicSlice'




function Player() {

const [positionX, setPositionX] = useState(0)

const handleTouchStart = (e) => {
  setPositionX(e.touches[0].clientX)
}

const handleTouchMove = (e)=> {
  const currentPositionX = e.touches[0].clientX

  if(positionX && currentPositionX) {

    const differentX = positionX - currentPositionX

    if (differentX > 100) {
      nextTrack()
    } else if (differentX < -100) {
      prevTrack()
    }

  }

}

  const isPlaying = useSelector(state => state.player.isPlaying)
  const currentTrack = useSelector(state => state.player.currentTrack)
  const policeMode = useSelector(state => state.music.policeMode)
  const darkTheme = useSelector(state => state.theme.darkTheme)
  const sounds = useSelector(state => state.player.tracks)
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
  },)


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

  const policeModeToogle = () => {
    dispatch(setPoliceMode())
  }

  useEffect(() => {
    if (isPlaying) {
      trackRef.current.play();
    } else {
      trackRef.current.pause();
    }
  }, [isPlaying, currentTrack])

  return (
    <div className={`container relative max-w-md max-h-min p-4 py-10 flex  rounded flex-col justify-start  items-center shadow-xl ${ darkTheme ? 'bg-gray-600' : 'bg-gray-300' } ${ isPlaying && policeMode && 'animate-colorPulseRed' }`} style={{ touchAction: 'pan-y' }} 
    onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <div className={`absolute left-2 top-5 flex h-4 cursor-pointer w-16 border border-black  rounded-md ${ isPlaying && 'animate-bounce' } ${ policeMode && 'shadow-police' }`} onClick={policeModeToogle}>
        <div className='w-1/2 border-r border-black rounded-s-md h-full bg-blue-600'></div>
        <div className='w-1/2 border-l border-black rounded-e-md h-full bg-red-600'></div>
      </div>
      <div className='text-sm mb-4'>Now Playing</div>
      <div className={`rounded-full w-40 h-40 bg-black flex flex-col items-center justify-center relative ${ isPlaying && 'animate-lazySpin' }`}>
        <Image className='rounded-full' src={currentTrack?.img} alt='track' width={130} height={130} />
        <div className={`rounded-full w-8 h-8  absolute border border-black ${ darkTheme ? 'bg-gray-600' : 'bg-gray-300' }`}></div>
      </div>
      <div className='relative overflow-hidden w-2/3'>
        <div className={`text-black mt-12 text-md ${ isPlaying && 'animate-wiggle' }`}>{currentTrack.title}</div>
      </div>
      <audio ref={trackRef} src={currentTrack.src} type='audio/mp3' onTimeUpdate={onPlaying} onEnded={nextTrack} />
      <div className='flex mt-2 justify-between w-10/12'>
        <p><span ref={minRefStart}></span>:<span ref={secRefStart}></span></p>
        <p><span ref={minRefEnd}></span>:<span ref={secRefEnd}></span></p>
      </div>
      <div className='w-10/12 h-2 bg-gray-500 rounded-lg mt-2 flex items-center justify-start cursor-pointer opacity-60' onClick={checkWidth} ref={clickRef} >
        <div className='h-2 bg-black rounded-lg' style={{width: `${ currentTrack.progress + '%' }`}}></div>
      </div>
      <div className='flex w-full items-center justify-between mt-10 px-10'>
        <button className='cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50' onClick={prevTrack}>
          <Image src={prevImg} alt='prev track' />
        </button>
        <button className='cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50'>

          {isPlaying ? <Image onClick={setPaused} src={pauseImg} alt='pause' /> : <Image onClick={setPlaying} src={playImg} alt='play' />}

        </button>
        <button className='cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50' onClick={nextTrack}>
          <Image className='rotate-180' src={prevImg} alt='next track' />
        </button>
      </div>
    </div>
  )
}

export default Player