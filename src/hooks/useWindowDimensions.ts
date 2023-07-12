import { useState, useEffect } from 'react'

type WindowDimensions = {
  width: number
  height: number
}

export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function getWindowDimensions(): WindowDimensions {
      const width = window.innerWidth
      const height = window.innerHeight
      return {
        width,
        height,
      }
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    setWindowDimensions(getWindowDimensions()) // 追加: useEffect内で初期値を設定
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // 空の依存配列があるので、このEffectは一度だけ実行されます。

  return windowDimensions
}
