import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Chivo } from 'next/font/google'

export const chivo = Chivo({
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
