import Image from 'next/image'
import { Inter } from 'next/font/google'
import { StrapiContent, StrapiStaff } from '../type/strapi'
import Content from '@/components/item/Content'
import Staff from '@/components/item/Staff'

const inter = Inter({ subsets: ['latin'] })

// /api/strapi/getTopStaff.tsで作成したapiをgetStaticPropsで取得
export const getStaticProps = async () => {
  const contents = await fetch('http://localhost:3000/api/strapi/getTopContents')
  const contentsData = await contents.json()
  const staffs = await fetch('http://localhost:3000/api/strapi/getTopStaffs')
  const staffsData = await staffs.json()
  // console.log(staffsData)
  return {
    props: {
      contentsData,
      staffsData,
    },
  }
}

export default function Home({
  contentsData,
  staffsData,
}: {
  contentsData: StrapiContent[]
  staffsData: StrapiStaff[]
}) {
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
              <li key={index} className=''>
                <Content content={content} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* staff */}
      <section className='w-layoutDefault m-auto'>
        <h2 className=''>
          <span className=''>人気のスタッフ</span>
          <span className=''>Staff</span>
        </h2>
        <div className=''>
          <ul className='grid grid-cols-4 gap-8 justify-center'>
            {staffsData.map((staff, index) => (
              <li key={index} className=''>
                <Staff staff={staff} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
