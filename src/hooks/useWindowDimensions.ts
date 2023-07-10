import { useState, useEffect } from 'react'

interface WindowDimensions {
  width: number
  height: number
}

// カスタムのuseWindowDimensions Hook
export function useWindowDimensions(): WindowDimensions {
  const hasWindow = typeof window !== 'undefined'

  function getWindowDimensions(): WindowDimensions {
    const width = hasWindow ? window.innerWidth : 0
    const height = hasWindow ? window.innerHeight : 0
    return {
      width,
      height,
    }
  }

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions())

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow]) // 空の依存配列があるので、このEffectは一度だけ実行されます。

  return windowDimensions
}
