import React, { useContext, useEffect, useState } from 'react'

const ScreenSizeContext = React.createContext(null)

export const ScreenSizeProvider = ({ children }) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoints: {
      MOBILE: {
        width: 768,
      },
      TABLET: {
        width: 1024,
      },
    },
  })
  useEffect(() => {
    const handleResize = () => {
      setSize(prevState => ({
        ...prevState,
        width: window.innerWidth,
        height: window.innerHeight,
      }))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <ScreenSizeContext.Provider value={size}>
      {children}
    </ScreenSizeContext.Provider>
  )
}

export const useScreenSize = () => useContext(ScreenSizeContext)
