import Image from 'next/image'
import { Inter } from 'next/font/google'
import { StrapiContent } from '../type/strapi'
import Content from '@/components/item/Content'

const inter = Inter({ subsets: ['latin'] })

// /api/strapi/index.tsで作成したapiをgetStaticPropsで取得
export const getStaticProps = async () => {
  const contents = await fetch('http://localhost:3000/api/strapi/getTopContents')
  const contentsData = await contents.json()
  return {
    props: {
      contentsData,
    },
  }
}

export default function Home({ contentsData }: { contentsData: StrapiContent[] }) {
  // console.log(1, contentsData)
  return (
    <main>
      {/* contents */}
      <section className='w-layoutDefault m-auto'>
        <h2 className=''>
          <span className=''>Contents</span>
          <span className=''>最新のスタッフ投稿</span>
        </h2>
        <div className=''>
          <ul className='grid grid-cols-4 gap-8 justify-center'>
            {contentsData.map((content, index) => (
              <Content key={index} content={content} />
              // console.log(content),
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
