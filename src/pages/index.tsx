import Image from 'next/image'
import { Chivo, Inter } from 'next/font/google'
import {
  StrapiContent,
  StrapiCoupon,
  StrapiFeature,
  StrapiStaff,
  StrapiStore,
} from '../type/strapi'
import Content from '@/components/item/Content'
import Staff from '@/components/item/Staff'
import axios from 'axios'
import Link from 'next/link'
import Store from '@/components/item/Store'
import Coupon from '@/components/item/Coupon'
import { chivo } from './_app'
import Button from '@/components/common/Button'
import Layout from '@/components/common/Layout'

// /api/strapi/getTopStaff.tsで作成したapiをgetStaticPropsで取得
export const getStaticProps = async () => {
  const feature = await fetch('http://localhost:3000/api/strapi/getCMS')
  const featureData = await feature.json()
  const contents = await fetch('http://localhost:3000/api/strapi/getTopContents')
  const contentsData = await contents.json()
  const staffs = await fetch('http://localhost:3000/api/strapi/getTopStaffs')
  const staffsData = await staffs.json()
  const stores = await fetch('http://localhost:3000/api/strapi/getTopStores')
  const storesData = await stores.json()
  const coupons = await fetch('http://localhost:3000/api/strapi/getTopCoupons')
  const couponsData = await coupons.json()

  return {
    props: {
      featureData,
      contentsData,
      staffsData,
      storesData,
      couponsData,
    },
  }
}

export default function Home({
  featureData,
  contentsData,
  staffsData,
  storesData,
  couponsData,
}: {
  featureData: StrapiFeature[]
  contentsData: StrapiContent[]
  staffsData: StrapiStaff[]
  storesData: StrapiStore[]
  couponsData: StrapiCoupon[]
}) {
  return (
    <Layout>
      {/* feature */}
      <section className=''>
        <ul className=''>
          {featureData.map((feature, index) => (
            <li key={index} className='w-[100rem] h-[60rem] m-auto'>
              <Link href={`/feature/${feature.id}`} className='relative'>
                <Image
                  src={`http://localhost:1330${feature.attributes.thumbnail.data.attributes.url}`}
                  width={feature.attributes.thumbnail.data.attributes.width}
                  height={feature.attributes.thumbnail.data.attributes.height}
                  alt={feature.attributes.title}
                  className=''
                />
                <div className='absolute bottom-12 left-16 text-green bg-black pt-12 px-16 pb-16 border-2 border-solid border-green max-w-[48rem]'>
                  <h2 className='mb-6 text-s9'>{feature.attributes.title}</h2>
                  <p className='text-s3'>{feature.attributes.introduction}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* contents */}
      <section className='w-layoutDefault m-auto mt-72'>
        <h2 className='mb-16 mx-36'>
          <span className={`text-s11 ${chivo.className}`}>Contents</span>
          <span className='inline-block w-4 h-4 mx-4 rounded-full bg-green'></span>
          <span className='text-s3'>最新のスタッフ投稿</span>
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
        <div className='flex justify-center w-full mt-32'>
          <Button href='contents'>スタッフ投稿一覧</Button>
        </div>
      </section>

      {/* staff */}
      <section className='w-layoutDefault m-auto mt-56'>
        <h2 className='flex flex-col items-center mb-16'>
          <span className='text-s3'>人気のスタッフ</span>
          <span className='inline-block w-4 h-4 mt-4 rounded-full bg-green'></span>
          <span className={`text-s11 ${chivo.className}`}>Staff</span>
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
        <div className='flex justify-center w-full mt-32'>
          <Button href='staffs'>スタッフ一覧</Button>
        </div>
      </section>

      {/* store */}
      <section className='w-layoutMd m-auto mt-56'>
        <div className='flex justify-between items-center mb-16 mx-36'>
          <h2 className=''>
            <span className={`text-s11 ${chivo.className}`}>Store</span>
            <span className='inline-block w-4 h-4 mx-4 rounded-full bg-green'></span>
            <span className='text-s3'>店舗一覧</span>
          </h2>
          <Button href='stores'>店舗一覧</Button>
        </div>
        <div className=''>
          <ul className='grid grid-cols-3 gap-12 justify-center '>
            {storesData.map((store, index) => (
              <li key={index} className=''>
                <Store store={store} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* coupon */}
      <section className='w-layoutDefault m-auto mt-56'>
        <h2 className='flex flex-col mb-16 mx-36'>
          <span className='text-s3'>クーポン</span>
          <span className='inline-block w-4 h-4 mt-4 rounded-full bg-green'></span>
          <span className={`text-s11 ${chivo.className}`}>Coupon</span>
        </h2>
        <div className=''>
          <ul className='grid grid-cols-4 gap-8 justify-center'>
            {couponsData.map((coupon, index) => (
              <li key={index} className=''>
                <Coupon coupon={coupon} />
              </li>
            ))}
          </ul>
        </div>
        <div className='flex justify-center w-full mt-32'>
          <Button href='coupons'>クーポン一覧</Button>
        </div>
      </section>
    </Layout>
  )
}
