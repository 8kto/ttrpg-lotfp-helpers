import { useEffect, useState } from 'react'
import { throttle } from 'throttle-debounce'

const useTailwindBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('sm')

  useEffect(() => {
    const checkBreakpoint = throttle(100, () => {
      const width = window.innerWidth
      if (width < 640) {
        setBreakpoint('xs')
      } else if (width >= 640 && width < 768) {
        setBreakpoint('sm')
      } else if (width >= 768 && width < 1024) {
        setBreakpoint('md')
      } else if (width >= 1024 && width < 1280) {
        setBreakpoint('lg')
      } else if (width >= 1280 && width < 1536) {
        setBreakpoint('xl')
      } else if (width >= 1536) {
        setBreakpoint('2xl')
      }
    })

    window.addEventListener('resize', checkBreakpoint)
    checkBreakpoint()

    return () => {
      checkBreakpoint.cancel()
      window.removeEventListener('resize', checkBreakpoint)
    }
  }, [])

  return breakpoint
}

export default useTailwindBreakpoint
