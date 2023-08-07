'use client'

import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'

import pauseImg from './img/pause.png'
import prevImg from './img/prev.png'
import playImg from './img/play.png'



const sounds = [
  {
    author: '50 Cent, Olivia',
    title: '50 Cent, Olivia – Candy Shop',
    src: '/audio/50 Cent, Olivia – Candy Shop.mp3',
    id: 1,
    img: '/img/50 Cent, Olivia – Candy Shop.jpg',
  },
  {
    author: 'Akon, Eminem',
    title: 'Akon, Eminem – Smack That',
    src: '/audio/Akon, Eminem – Smack That.mp3',
    id: 2,
    img: '/img/Akon, Eminem – Smack That.jpg',
  },
  {
    author: 'Alan Walker',
    title: 'Alan Walker – Faded',
    src: '/audio/Alan Walker – Faded.mp3',
    id: 3,
    img: '/img/Alan Walker – Faded.png',
  },
  {
    author: 'Alec Benjamin',
    title: 'Alec Benjamin – Let Me Down Slowly',
    src: '/audio/Alec Benjamin – Let Me Down Slowly.mp3',
    id: 4,
    img: '/img/Alec Benjamin – Let Me Down Slowly.jpg',
  },
  {
    author: 'Ed Sheeran',
    title: 'Ed Sheeran – Shape of You',
    src: '/audio/Ed Sheeran – Shape of You.mp3',
    id: 5,
    img: '/img/Ed Sheeran – Shape of You.jpg',
  },
  {
    author: 'Eminem',
    title: 'Eminem – Mockingbird',
    src: '/audio/Eminem – Mockingbird.mp3',
    id: 6,
    img: '/img/Eminem – Mockingbird.jpg',
  },
  {
    author: 'Eminem',
    title: 'Eminem – Not Afraid',
    src: '/audio/Eminem – Not Afraid.mp3',
    id: 7,
    img: '/img/Eminem – Not Afraid.jpg',
  },
  {
    author: 'Eminem, Rihanna',
    title: 'Eminem, Rihanna – Love The Way You Lie',
    src: '/audio/Eminem, Rihanna – Love The Way You Lie.mp3',
    id: 8,
    img: '/img/Eminem, Rihanna – Love The Way You Lie.jpg',
  },
  {
    author: 'Enrique Iglesias',
    title: 'Enrique Iglesias – Ring My Bells',
    src: '/audio/Enrique Iglesias – Ring My Bells.mp3',
    id: 9,
    img: '/img/Enrique Iglesias – Ring My Bells.png',
  },
  {
    author: 'Europe',
    title: 'Europe – The Final Countdown',
    src: '/audio/Europe – The Final Countdown.mp3',
    id: 10,
    img: '/img/Europe – The Final Countdown.jpg',
  },
  {
    author: 'Evanescence',
    title: 'Evanescence – Bring Me To Life',
    src: '/audio/Evanescence – Bring Me To Life.mp3',
    id: 11,
    img: '/img/Evanescence – Bring Me To Life.jpg',
  },
  {
    author: 'Inna',
    title: 'Inna – Hot',
    src: '/audio/Inna – Hot.mp3',
    id: 12,
    img: '/img/Inna – Hot.jpg',
  },
  {
    author: 'Nelly Furtado',
    title: 'Nelly Furtado – Say It Right',
    src: '/audio/Nelly Furtado – Say It Right.mp3',
    id: 13,
    img: '/img/Nelly Furtado – Say It Right.webp',
  },
  {
    author: 'Rammstein',
    title: 'Rammstein – DU HAST',
    src: '/audio/Rammstein – DU HAST.mp3',
    id: 14,
    img: '/img/Rammstein – DU HAST.jpg',
  },
  {
    author: 'Rihanna',
    title: 'Rihanna – Diamonds',
    src: '/audio/Rihanna – Diamonds.mp3',
    id: 15,
    img: '/img/Rihanna – Diamonds.jpg',
  },
  {
    author: 'The Black Eyed Peas',
    title: 'The Black Eyed Peas – My Humps',
    src: '/audio/The Black Eyed Peas – My Humps.mp3',
    id: 16,
    img: '/img/The Black Eyed Peas – My Humps.jpg',
  },
  {
    author: 'Usher, Lil Jon, Ludacris',
    title: 'Usher, Lil Jon, Ludacris – Yeah!',
    src: '/audio/Usher, Lil Jon, Ludacris – Yeah!.mp3',
    id: 17,
    img: '/img/Usher, Lil Jon, Ludacris – Yeah!.webp',
  },
]



export default function Home() {

  const trackRef = useRef();
  const clickRef = useRef();
  const minRef = useRef();
  const secRef = useRef();
  const minRef1 = useRef();
  const secRef1 = useRef();


  const [tracks, setTracks] = useState(sounds)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(sounds[0])
  const [playlist, setPlaylist] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)

  const PlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const findTrack = (element, arr) => {
    const title = element.textContent;
    const index = arr.findIndex(item => item.title === title)
    setCurrentTrack(sounds[index])
    setIsPlaying(true)
    setPlaylist(false)
  }

  useEffect(() => {
    minRef.current.textContent = trackMin(trackRef.current.currentTime)
    secRef.current.textContent = trackSec(trackRef.current.currentTime)
    minRef1.current.textContent = trackMin(trackRef.current.duration)
    secRef1.current.textContent = trackSec(trackRef.current.duration)
  },)


  useEffect(() => {
    if (isPlaying) {
      trackRef.current.play();
    } else {
      trackRef.current.pause();
    }
  }, [isPlaying, currentTrack])



  const onPlaying = () => {
    const duration = trackRef.current.duration;
    const curTime = trackRef.current.currentTime;

    setCurrentTrack({...currentTrack, 'progress': curTime / duration * 100, length: duration})

  }

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX

    const progress = offset / width * 100
    trackRef.current.currentTime = progress / 100 * currentTrack.length
  }

  const prevTrack = () => {
    const indexTrack = sounds.findIndex(sound => sound.title == currentTrack.title)
    if (indexTrack == 0) {
      setCurrentTrack(sounds[sounds.length - 1])
    } else {

      setCurrentTrack(sounds[indexTrack - 1])
    }

    trackRef.current.currentTime = 0;
    setIsPlaying(true)
  }

  const nextTrack = () => {
    const indexTrack = sounds.findIndex(sound => sound.title == currentTrack.title)
    if (indexTrack == sounds.length - 1) {
      setCurrentTrack(sounds[0])
    } else {

      setCurrentTrack(sounds[indexTrack + 1])
    }

    trackRef.current.currentTime = 0;
    setIsPlaying(true)
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


  return (
    <div className={`w-screen min-h-full h-full p-10 mx-auto relative flex flex-row justify-center items-start gap-16 rte:flex-col rte:justify-start rte:items-center ${darkTheme? 'bg-black' : 'bg-gray-200'}`}>
      <div className={`container max-w-md p-4 py-10 flex  rounded flex-col justify-center items-center shadow-xl ${darkTheme? 'bg-gray-600': 'bg-gray-300'}`}>
        <div className='text-sm mb-4'>Now Playing</div>
        <div className={`rounded-full w-40 h-40 bg-black flex flex-col items-center justify-center relative ${ isPlaying && 'animate-lazySpin' }`}>
          <Image className='rounded-full' src={currentTrack?.img} alt='track' width={130} height={130} />
          <div className='rounded-full w-8 h-8 bg-gray-300 absolute border border-black'></div>
        </div>
        <div className='relative overflow-hidden'>
          <div className={`text-black mt-12 text-xl ${ isPlaying && 'animate-wiggle' }`}>{currentTrack.title}</div>
        </div>
        <audio ref={trackRef} src={currentTrack.src} type='audio/mp3' onTimeUpdate={onPlaying} onEnded={nextTrack} />
        <div className='flex mt-2 justify-between w-10/12'>
          <p><span ref={minRef}></span>:<span ref={secRef}></span></p>
          <p><span ref={minRef1}></span>:<span ref={secRef1}></span></p>
        </div>
        <div className='w-10/12 h-2 bg-gray-500 rounded-lg mt-2 flex items-center justify-start cursor-pointer opacity-60' onClick={checkWidth} ref={clickRef} >
          <div className='h-2 bg-black rounded-lg' style={{width: `${ currentTrack.progress + '%' }`}}></div>
        </div>
        <div className='flex w-full items-center justify-between mt-10 px-10'>
          <button className='cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50' onClick={prevTrack}>
            <Image src={prevImg} alt='prev track' />
          </button>
          <button className='cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50'>

            {isPlaying ? <Image onClick={PlayPause} src={pauseImg} alt='pause' /> : <Image onClick={PlayPause} src={playImg} alt='play' />}

          </button>
          <button className='cursor-pointer p-0 w-16 h-16 duration-200 hover:scale-110 active:opacity-50' onClick={nextTrack}>
            <Image className='rotate-180' src={prevImg} alt='next track' />
          </button>
        </div>
      </div>
      <div className='w-96'>
        <button className={`border-b-2 border-gray-500 mt-2 opacity-60 ${ playlist ? 'text-red-800' : 'text-green-700' }`} onClick={() => {setPlaylist(!playlist)}}>{playlist ? 'Hide Playlist' : 'Show Playlist'}</button>
        {playlist ? (<div className='container max-w-md mx-auto mt-6 p4 grid gap-4 max-h-96 overflow-y-scroll'>

          {tracks?.map((track) => (
            <p className={`flex items-center gap-4 cursor-pointer ${darkTheme? 'text-white' : 'text-black'} text-xs hover:opacity-30 ${ track.title === currentTrack.title ? 'animate-bounce' : '' }`} onClick={(e) => {findTrack(e.currentTarget, sounds)}} key={track.id}><Image src={track.img} alt={track.author} width={50} height={50}></Image>{track.title}</p>
          ))}
        </div>) : (<div className="flex w-full h-96 justify-between items-end">
          <div className={`w-16 h-1 bg-green-500 opacity-30 ${ isPlaying && 'animate-upDown1' }`}></div>
          <div className={`w-16 bg-red-400 h-1 opacity-30 ${ isPlaying && 'animate-upDown2' }`}></div>
          <div className={`w-16 bg-violet-400 h-1 opacity-30 ${ isPlaying && 'animate-upDown3' }`}></div>
          <div className={`w-16 bg-blue-400 h-1 opacity-30 ${ isPlaying && 'animate-upDown4' }`}></div>
          <div className={`w-16 bg-orange-400 h-1 opacity-30 ${ isPlaying && 'animate-upDown5' }`}></div>
        </div>)}

      </div>
      <div className={`w-10 h-10 cursor-pointer absolute right-10 top-10 duration-200 hover:scale-110 ${isPlaying && 'animate-bounce'}`} onClick={()=>{setDarkTheme(!darkTheme)}}>
            {darkTheme? <Image src='/icons/moon.png' alt='dark-theme' width='40' height='40'/> : <Image src='/icons/day.png' alt='light theme' width='40' height='40' />}
      </div>
    </div>
  )
}
