import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import Nav from '../components/navigation/Nav'

import appContext from '../context/AppContext'
import userContext from '../context/UserContext'

const { Provider: AppContextProvider } = appContext
const { Provider: UserContextProvider } = userContext

import CardGroup from '../components/cardGroup/CardGroup'

const Home = () => {
  const [appState, setAppState] = useState({})
  const refreshApp = useCallback(() => setAppState({ ...appState }), [])
  const [userState, setUserState] = useState({})
  const refreshUser = useCallback(() => setUserState({ ...userState }), [])

  return <>
    <AppContextProvider value={{ appState, setAppState, refreshApp }}>
      <UserContextProvider value={{ userState, setUserState, refreshUser }}>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
        <title>Protean Card Editor</title>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js" />
      </Head>
      <Nav />
      <CardGroup />
      </UserContextProvider>
    </AppContextProvider>
  </>
}

export default Home
