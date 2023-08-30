'use client'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import Player from './Player.jsx'

export default function Home() {

  return (
    <Provider store={store}>
      <Player />
    </Provider>
  )
}
