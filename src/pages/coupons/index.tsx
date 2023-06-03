import { StrapiCoupon } from '@/type/strapi'
import React from 'react'
import Coupon from '@/components/item/Coupon'
import Layout from '@/components/layout/Layout'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllCoupons')
  const coupons = await res.json()
  return {
    props: {
      coupons,
    },
  }
}

export default function Coupons({ coupons }: { coupons: StrapiCoupon[] }) {
  return (
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative flex items-end gap-6 mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>クーポン一覧</span>
          <span className='text-s7'>【{coupons.length}】</span>
        </h1>
        <div className='grid grid-cols-[20rem_1fr] content-between gap-24'>
          {/* side */}
          <div className='flex flex-col gap-20'>
            {/* deadline */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>期限</span>
              <div className='flex flex-col gap-2 mt-8'>
                <label htmlFor='one' className='flex flex-row gap-2'>
                  <input type='radio' id='one' name='one' />
                  <span className='text-s3'>1ヶ月以内</span>
                </label>
                <label htmlFor='three' className='flex flex-row gap-2'>
                  <input type='radio' id='three' name='three' />
                  <span className='text-s3'>3ヶ月以内</span>
                </label>
                <label htmlFor='six' className='flex flex-row gap-2'>
                  <input type='radio' id='six' name='six' />
                  <span className='text-s3'>6ヶ月以内</span>
                </label>
              </div>
            </div>
            {/* area */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>エリア</span>
              <div className='mt-8'>
                <select name='area' id='area' className='w-full px-6 py-4 text-black text-s3'>
                  <option value=''>エリアを選択する</option>
                  <option value='tokyo'>東京</option>
                  <option value='chiba'>千葉</option>
                </select>
              </div>
            </div>
            {/* privilege */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>
                特典内容
              </span>
              <div className='mt-8'>
                <select name='area' id='area' className='w-full px-6 py-4 text-black text-s3'>
                  <option value=''>どんな特典があるの？</option>
                  <option value='tokyo'>他券・サービス併用不可</option>
                  <option value='chiba'>要予約</option>
                </select>
              </div>
            </div>
            {/* facility */}
            {/* <div className=''>
            <ul className=''>
              <li className=''></li>
            </ul>
          </div> */}
          </div>
          {/* main */}
          <div className='w-layoutSm'>
            <ul className='grid grid-cols-3 gap-4'>
              {coupons.map((coupon, index) => (
                <li key={index} className=''>
                  <Coupon coupon={coupon} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}
