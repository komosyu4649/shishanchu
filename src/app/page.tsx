'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { StrapiContent } from '../type/strapi'

const inter = Inter({ subsets: ['latin'] })

// /api/strapi/index.tsで作成したapiをgetStaticPropsで取得
// export const getStaticProps = async () => {
//   const rest = await fetch('http://localhost:3000/api/strapi/getAllContents')
//   const data = await rest.json()
//   return {
//     props: {
//       data,
//     }
//   }
// }

// export default function Home({data}: {data: StrapiContent[]}) {
// console.log( 1 ,data)
export default async function Home() {
  // const rest = await fetch('http://localhost:3000/api/strapi/route')
  // const data = await rest.json()
  // console.log(data)
  const test = await fetch('/api/strapi')
  const testData = await test.json()
  // console.log(1, test)
  console.log(1, testData)
  return <main>test</main>
}
