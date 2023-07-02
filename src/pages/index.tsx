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
import { CMSContents, CMSFeature, CMSStaff, CMSStore } from '@/type/microcms'
import { ACCOUNTS, MICROCMS_ENDPOINT_CMS_FEATURES } from '@/constants/microcms'
import { fetchCommonListDatas } from '@/lib/microcms/fetchCommonListDatas'
import { fetchCommonJsonDatas } from '@/lib/microcms/fetchCommonJsonDatas'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

export const getStaticProps = async () => {
  const coupons = await fetch('http://localhost:3000/api/strapi/getTopCoupons')
  const couponsData = await coupons.json()

  const featureData = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURES, 0, 3)
  const contentsData = await fetchCommonListDatas('contents', 4)
  const staffsData = await fetchCommonListDatas('staffs', 4)
  const storesData = await fetchCommonJsonDatas('store', 4)

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
  featureData: CMSFeature[]
  contentsData: CMSContents[]
  staffsData: CMSStaff[]
  storesData: CMSStore[]
  couponsData: StrapiCoupon[]
}) {
  const swiperPagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className} bg-green opacity-100 w-12 h-12 block"></span>`
    },
  }

  return (
    <Layout>
      {/* feature */}
      <section className='top-feature'>
        <Swiper
          spaceBetween={15}
          slidesPerView={1.2}
          centeredSlides={true}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          // loop={true}
          pagination={{
            clickable: true,
          }}
          // // navigation={true}
          modules={[Navigation, Autoplay, Pagination]}
          className='h-[calc(100vh-18rem)]'
        >
          {featureData.map((feature, index) => (
            <SwiperSlide key={index}>
              <Link href={`/features/${feature.id}`} className='relative block h-full'>
                <Image
                  src={feature.thumbnail.url}
                  width={feature.thumbnail.width}
                  height={feature.thumbnail.height}
                  alt={feature.title}
                  className='h-full object-cover'
                  // className='w-[100rem] h-[60rem] object-cover'
                />
                {/* <div className='absolute bottom-12 left-16 text-green bg-black pt-12 px-16 pb-16 border-2 border-solid border-green max-w-[48rem]'> */}
                {/* <div className='absolute bottom-20 left-16 text-white pt-12 px-16 pb-16 border-2 border-solid border-white'> */}
                <div className='absolute bottom-32 left-24 text-white'>
                  <h2 className='mb-6 text-s10'>{feature.title}</h2>
                  <p className='text-s3'>{feature.introduction}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div id='pagination' className='swiper-pagination bg-white'></div>
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
      {/* <section className='w-layoutDefault m-auto mt-56'>
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
      </section> */}
    </Layout>
  )
}
