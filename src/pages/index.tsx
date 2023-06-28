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
import Layout from '@/components/layout/Layout'
import { getMicroCMSDataList } from '@/lib/microcms/fetchCMS'
import { CMSFeature } from '@/type/microcms'
import { ACCOUNTS, MICROCMS_ENDPOINT_CMS_FEATURES } from '@/constants/microcms'
import { createClient } from 'microcms-js-sdk'

// /api/strapi/getTopStaff.tsで作成したapiをgetStaticPropsで取得
export const getStaticProps = async () => {
  // const feature = await fetch('http://localhost:3000/api/strapi/getCMS')
  // const featureData = await feature.json()
  // console.log(featureData)
  // const contents = await fetch('http://localhost:3000/api/strapi/getTopContents')
  // const contentsData = await contents.json()
  const staffs = await fetch('http://localhost:3000/api/strapi/getTopStaffs')
  const staffsData = await staffs.json()
  const stores = await fetch('http://localhost:3000/api/strapi/getTopStores')
  const storesData = await stores.json()
  const coupons = await fetch('http://localhost:3000/api/strapi/getTopCoupons')
  const couponsData = await coupons.json()

  const features = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURES, 0, 3)
  const featureData = features.contents
  // const contents = await fetch('http://localhost:3000/api/microcms/getAllContents')

  // const contentsData = await contents.json()
  // console.log(contents)

  // microcmsのcreateClientを使って、複数のACCOUNTSのcontentsエンドポイントのデータを配列として取得する
  const contentsData = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const res = createClient({
        serviceDomain: account.name,
        apiKey: account.key,
      }).get({
        endpoint: 'contents',
      })
      return await res
    }),
  )
  console.log(contentsData)

  return {
    props: {
      featureData,
      // contentsData,
      staffsData,
      storesData,
      couponsData,
    },
  }
}

export default function Home({
  featureData,
  // contentsData,
  staffsData,
  storesData,
  couponsData,
}: {
  featureData: CMSFeature[]
  // contentsData: StrapiContent[]
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
                  src={feature.thumbnail.url}
                  width={feature.thumbnail.width}
                  height={feature.thumbnail.height}
                  alt={feature.title}
                  className='w-[100rem] h-[60rem] object-cover'
                />
                <div className='absolute bottom-12 left-16 text-green bg-black pt-12 px-16 pb-16 border-2 border-solid border-green max-w-[48rem]'>
                  <h2 className='mb-6 text-s9'>{feature.title}</h2>
                  <p className='text-s3'>{feature.introduction}</p>
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
            {/* {contentsData.map((content, index) => (
              <li key={index} className=''>
                <Content content={content} />
              </li>
            ))} */}
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
            {/* {staffsData.map((staff, index) => (
              <li key={index} className=''>
                <Staff staff={staff} />
              </li>
            ))} */}
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
            {/* {storesData.map((store, index) => (
              <li key={index} className=''>
                <Store store={store} />
              </li>
            ))} */}
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
            {/* {couponsData.map((coupon, index) => (
              <li key={index} className=''>
                <Coupon coupon={coupon} />
              </li>
            ))} */}
          </ul>
        </div>
        <div className='flex justify-center w-full mt-32'>
          <Button href='coupons'>クーポン一覧</Button>
        </div>
      </section>
    </Layout>
  )
}
