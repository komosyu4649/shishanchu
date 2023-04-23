import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GetStaticProps } from 'next'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home({posts}) {
  console.log(posts)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    </main>
  )
}

// /cmsのstrapiからデータを取得する
export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch('http://localhost:3000/api/strapi')
  const postsData = await(await axios.get("http://localhost:1337/api/contents")).data.data
  // console.log(res)
  // const posts = await res.json()
  return {
    props: {
      posts : postsData,
    },
  }
}

