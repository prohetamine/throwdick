import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Background from './components/background'
import styled from 'styled-components'
import queryString from 'query-string'

import Symbol from './pages/symbol'
import Search from './pages/search'
import Create from './pages/create'
import ControllLink from './pages/controll-link'
import Manager from './pages/manager'

const PageBody = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
`

let from = null
  , to = null

window.pageAnimationRouter = data => {
  from = data.from
  to = data.to
}

const App = () => {
  const location = useLocation()

  useEffect(() => {
    try {
      window.animateBackground()
    } catch (e) {}
  }, [location.pathname])

  const variants = {
    left: {
      x: '-100%',
      transition: { ease: 'easeOut', duration: 1 }
    },
    right: {
      x: '100%',
      transition: { ease: 'easeOut', duration: 1 }
    },
    current: {
      x: '0%',
      transition: { ease: 'easeOut', duration: 1 }
    }
  }

  const parsed = queryString.parse(location.search)


  const initialFrom = () => from === null ? 'current' : from ? 'left' : 'right'
      , exitTo = () => to === null ? 'current' : to ? 'left' : 'right'

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <PageBody
              initial={initialFrom}
              exit={exitTo}
              animate={'current'}
              variants={variants}
            >
              <Search />
            </PageBody>
          }
        />
        <Route
          path='/search'
          element={
            <PageBody
              initial={initialFrom}
              exit={exitTo}
              animate={'current'}
              variants={variants}
            >
              <Search />
            </PageBody>
          }
        />
        <Route
          path='/cl/*'
          element={
            <PageBody
              initial={initialFrom}
              exit={exitTo}
              animate={'current'}
              variants={variants}
            >
              <ControllLink />
            </PageBody>
          }
        />
        <Route
          path='/manager'
          element={
            <PageBody
              initial={initialFrom}
              exit={exitTo}
              animate={'current'}
              variants={variants}
            >
              <Manager />
            </PageBody>
          }
        />
        <Route
          path='/create'
          element={
            <PageBody
              initial={initialFrom}
              exit={exitTo}
              animate={'current'}
              variants={variants}
            >
              <Create />
            </PageBody>
          }
        />
        <Route
          path='/*'
          element={
            <PageBody
              initial={initialFrom}
              exit={exitTo}
              animate={'current'}
              variants={variants}
            >
              <Symbol />
            </PageBody>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default App
