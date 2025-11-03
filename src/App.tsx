import React, { useState } from 'react'
import AppContext from './context'
import "./scss/base.scss"
import Router from './Router'
import Nav from './components/Nav/Nav'

const App: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <Nav/>
      <Router/>
    </AppContext.Provider>
  )
}

export default App
