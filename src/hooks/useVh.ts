import { useCallback, useEffect } from 'react'

export const useVh = (): void => {
  const setVh = useCallback(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  useEffect(() => {
    setVh()

    window.addEventListener('resize', setVh)
  }, [setVh])
}
