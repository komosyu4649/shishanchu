import { useState, useEffect } from 'react'

export function useTimeAgo(timestamp: string) {
  const [timeAgo, setTimeAgo] = useState('')

  function formatTimeAgo(timestamp: string): string {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 60) {
      return 'たった今'
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60)
      return `${minutes}分前`
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600)
      return `${hours}時間前`
    } else {
      const days = Math.floor(diff / 86400)
      return `${days}日前`
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(timestamp))
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  return timeAgo
}
