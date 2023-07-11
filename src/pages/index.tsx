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
import 'swiper/css/navigation'
import TitleSection from '@/components/common/TitleSection'
import ContentSm from '@/components/item/ContentSm'

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
      <section className='top-feature md:mt-44'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          // loop={true}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          navigation={{
            nextEl: '.next-slide-button',
            prevEl: '.prev-slide-button',
          }}
          modules={[Navigation, Autoplay, Pagination]}
          breakpoints={{
            768: {
              slidesPerView: 1.2,
              spaceBetween: 15,
            },
          }}
          className='
            h-[calc(100vh-6rem)] 
            md:h-[calc(100vh-18rem)]
            '
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
                />
                <div
                  className='
                    absolute bottom-28 left-8 text-white
                    md:bottom-28 md:left-24'
                >
                  <h2
                    className='
                      mb-4 text-s8 
                      md:mb-6 md:text-s10
                  '
                  >
                    {feature.title}
                  </h2>
                  <p className='text-s3'>{feature.introduction}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className='
              hidden absolute top-56 right-72 z-10
              md:flex md:flex-row md:gap-2 
              '
        >
          <button className='prev-slide-button flex justify-center items-center text-white p-4 bg-white w-20 h-20 text-s8'>
            <Image
              src='/asset/img/arrow.svg'
              width={8}
              height={8}
              alt='前へ'
              className='rotate-180'
            />
          </button>
          <button className='next-slide-button flex justify-center items-center w-20 h-20  p-4  bg-white text-white text-s8'>
            <Image src='/asset/img/arrow.svg' width={8} height={8} alt='前へ' />
          </button>
        </div>
      </section>

      {/* contents */}
      <section
        className='
        w-layoutMbDefault m-auto mt-32 
        md:w-layoutMd md:mt-72
        '
      >
        <TitleSection en='Contents' ja='最新のスタッフ投稿' className='mb-10 md:mb-12' />
        <ul
          className='
          grid grid-cols-2 gap-x-4 gap-y-8 
          md:grid-cols-4 md:gap-8
          '
        >
          {contentsData.map((content, index) => (
            <li key={index} className=''>
              <ContentSm content={content} />
            </li>
          ))}
        </ul>
        <div
          className='
            flex justify-center mt-16
            md:w-fit md:m-auto md:mt-16'
        >
          <Button href='contents'>スタッフ投稿一覧</Button>
        </div>
      </section>

      {/* staff */}
      <section
        className='
          m-auto mt-32 
          md:w-layoutDefault md:mt-56
        '
      >
        <TitleSection
          en='Staff'
          ja='最新のスタッフ情報'
          className='
            w-layoutMbDefault m-auto mb-10 
            md:justify-center md:items-center md:mb-12
            '
        />
        <div
          className='
          border-t border-white border-opacity-60 
          md:border-none
        '
        >
          <ul
            className='
              md:grid md:grid-cols-3 md:gap-6
            '
          >
            {staffsData.map((staff, index) => (
              <li
                key={index}
                className='
                  h-fit border-b border-white border-opacity-60
                  md:border md:rounded-md md:overflow-hidden
                '
              >
                <Staff staff={staff} />
              </li>
            ))}
          </ul>
        </div>
        <div
          className='
            flex justify-center w-layoutMbDefault m-auto mt-16
            md:w-fit
          '
        >
          <Button href='staffs'>スタッフ一覧</Button>
        </div>
      </section>

      {/* store */}
      <section
        className='
          m-auto mt-32 
          md:w-layoutMd md:mt-56 
        '
      >
        <TitleSection
          en='Store'
          ja='最新の店舗情報'
          className='
            w-layoutMbDefault m-auto mb-10 
            md:w-full md:mb-12
          '
        />
        <div className='overflow-x-scroll'>
          <ul
            className='
            flex flex-row gap-6 w-fit px-[calc((100vw-35.8rem)*.5)] 
            md:grid md:grid-cols-5 md:px-0 
          '
          >
            {storesData.map((store, index) => (
              <li
                key={index}
                className='
                  w-60 
                  md:w-full
                '
              >
                <Store store={store} />
              </li>
            ))}
          </ul>
        </div>
        <div
          className='
            flex justify-center w-layoutMbDefault m-auto mt-16
            md:w-fit
          '
        >
          <Button href='stores'>店舗一覧</Button>
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
