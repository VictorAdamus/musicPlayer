'use client'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

import Music from './Music'

export default function Home() {

  return (
    <Provider store={store}>
      <Music />
    </Provider>
  )
}
