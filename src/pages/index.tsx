import Image from 'next/image'
import { Inter } from 'next/font/google'
import { StrapiContent, StrapiStaff } from '../type/strapi'
import Content from '@/components/item/Content'

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
              <Content key={index} content={content} />
            ))}
          </ul>
        </div>
      </section>
      {/* staff */}
      <section className=''>
        <h2 className=''>
          <span className=''>人気のスタッフ</span>
          <span className=''>Staff</span>
        </h2>
        <div className=''>
          <ul className=''>
            {/* {staffsData.map((staff, index) => (
              <li key={index} className=''>
                <Image
                  src={`http://localhost:1337${staff.icon.url}`}
                  width={staff.icon.width}
                  height={staff.icon.height}
                  alt='test'
                  className=''
                />
                <p className=''>{staff.username}</p>
                <p className=''>{staff.biography}</p>
              </li>
            ))} */}
          </ul>
        </div>
      </section>
    </main>
  )
}
