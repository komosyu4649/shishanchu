import { useState, useEffect } from 'react'

export function useTimeAgo(timestamp: string) {
  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const year = month * 12

  const [timeAgo, setTimeAgo] = useState('')

  function formatTimeAgo(timestamp: string): string {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < minute) {
      return 'たった今'
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute)
      return `${minutes}分前`
    } else if (diff < day) {
      const hours = Math.floor(diff / hour)
      return `${hours}時間前`
    } else if (diff < month) {
      const days = Math.floor(diff / day)
      return `${days}日前`
    } else if (diff < year) {
      const months = Math.floor(diff / month)
      return `${months}ヶ月前`
    } else {
      const years = Math.floor(diff / year)
      return `${years}年前`
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
