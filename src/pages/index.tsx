import Image from 'next/image'
import { Inter } from 'next/font/google'
import { StrapiContent, StrapiStaff, StrapiStore } from '../type/strapi'
import Content from '@/components/item/Content'
import Staff from '@/components/item/Staff'
import axios from 'axios'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

// /api/strapi/getTopStaff.tsで作成したapiをgetStaticPropsで取得
export const getStaticProps = async () => {
  const contents = await fetch('http://localhost:3000/api/strapi/getTopContents')
  const contentsData = await contents.json()
  const staffs = await fetch('http://localhost:3000/api/strapi/getTopStaffs')
  const staffsData = await staffs.json()
  const stores = await fetch('http://localhost:3000/api/strapi/getTopStores')
  const storesData = await stores.json()
  // console.log(storesData)
  return {
    props: {
      contentsData,
      staffsData,
      storesData,
    },
  }
}

export default function Home({
  contentsData,
  staffsData,
  storesData,
}: {
  contentsData: StrapiContent[]
  staffsData: StrapiStaff[]
  storesData: StrapiStore[]
}) {
  // console.log(storesData[0].attributes.icon)
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
      {/* store */}
      <section className='w-layoutMd m-auto'>
        <h2 className=''>
          <span className=''>人気の店舗</span>
          <span className=''>Store</span>
        </h2>
        <div className=''>
          <ul className='grid grid-cols-3 gap-12 justify-center '>
            {storesData.map((store, index) => (
              <li key={index} className=''>
                <Link href={`${store.accountName}`}>
                  <Image
                    src={`http:localhost:${store.accountName}${store.attributes.icon.data.attributes.url}`}
                    width={store.attributes.icon.data.attributes.width}
                    height={store.attributes.icon.data.attributes.height}
                    alt='test'
                    className='w-full h-96 object-cover rounded-br-[6rem]'
                  />
                  <div className='flex flex-col gap-2 mt-8'>
                    <span className='text-s6'>{store.storeName}</span>
                    <span className='text-s2 opacity-60'>
                      {store.region?.prefectures}
                      {store.region?.city}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
