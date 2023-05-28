import { ACCOUNTS } from '@/constants/strapi'
import { StrapiCoupon } from '@/type/strapi'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const getStaticPaths = async () => {
  const coupons = await fetch('http://localhost:3000/api/strapi/getAllCoupons')
  const couponsData: StrapiCoupon[] = await coupons.json()
  return {
    paths: couponsData.map((coupon) => ({
      params: {
        store: coupon.accountName,
        id: coupon.id.toString(),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (params: any) => {
  const { store, id } = params.params
  const accuntData = ACCOUNTS.find((account) => account.name === store)
  const coupon = await axios.get(`http://localhost:${store}/api/coupons/${id}`, {
    headers: {
      Authorization: `Bearer ${accuntData?.jwt}`,
    },
  })
  const couponData = coupon.data.data

  const stores = await axios.get(
    `http://localhost:${store}/api/stores/1?populate=information.address`,
    {
      headers: {
        Authorization: `Bearer ${accuntData?.jwt}`,
      },
    },
  )

  const storeData = stores.data.data

  const storeName = accuntData?.store

  return {
    props: {
      couponData,
      storeData,
      storeName,
      store,
    },
  }
}

export default function CouponDetail({ couponData, storeData, storeName, store }) {
  // console.log(couponData)
  console.log(storeData.attributes.information.address)
  return (
    <section className='w-[80rem] m-auto mt-96 rounded-3xl border-2 border-green border-solid overflow-hidden'>
      <p className='p-8 text-s6 bg-green text-center'>スタッフにこちらの画面を提示してください</p>
      <div className='px-40 py-32 bg-blackWeak'>
        <h1 className='text-s9 mb-20 pb-8 border-b-4 border-white border-solid'>
          {couponData.attributes.title}
        </h1>
        <div className='grid grid-cols-2 gap-16'>
          {/* store */}
          <div className=''>
            <h2 className='block mb-12 px-6 py-4 text-s7 text-green bg-black'>{storeName}</h2>
            <ul className='flex flex-col gap-6 ml-6'>
              <li className=''>
                <Link href={`/${store}/`} className='grid grid-cols-[auto_1fr] gap-4 items-center'>
                  <Image
                    src={`/asset/img/iconStore.svg`}
                    alt='store icon'
                    width={20}
                    height={18.37}
                    className='w-8'
                  />
                  <span className='text-s5'>店舗詳細</span>
                </Link>
              </li>
              <li className=''>
                <Link
                  href={storeData.attributes.information.address.url}
                  target='_blank'
                  rel='noopener'
                  className='grid grid-cols-[auto_1fr] gap-4 items-center'
                >
                  <Image
                    src={`/asset/img/iconAccess.svg`}
                    alt='store icon'
                    width={20}
                    height={20}
                    className='w-8'
                  />
                  <span className='text-s5'>店舗アクセス</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* main */}
          <div className='flex flex-col gap-8'>
            <dl className='grid grid-cols-[auto_1fr] gap-6'>
              <dt className='inline-block h-fit px-4 py-2 text-s3 text-black bg-white'>利用条件</dt>
              <dd className='text-s3 py-2'>{couponData.attributes.termsOfUse}</dd>
            </dl>
            <dl className='grid grid-cols-[auto_1fr] gap-6'>
              <dt className='inline-block h-fit px-4 py-2 text-s3 text-black bg-white'>提示条件</dt>
              <dd className='text-s3 py-2'>{couponData.attributes.presentationConditions}</dd>
            </dl>
            <dl className='grid grid-cols-[auto_1fr] gap-6'>
              <dt className='inline-block h-fit px-4 py-2 text-s3 text-black bg-white'>有効期限</dt>
              <dd className='text-s3 py-2'>{couponData.attributes.dateOfExpiry}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
