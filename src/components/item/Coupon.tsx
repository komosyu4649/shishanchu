import { StrapiCoupon } from '@/type/strapi'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

const Coupon = ({ coupon }: { coupon: StrapiCoupon }) => {
  return (
    <Link
      href={`${coupon.accountName}/coupon/${coupon.id}`}
      className='rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak flex flex-col justify-between w-full h-full p-12'
    >
      <div className='block pb-4 border-b-4'>
        <span className='text-s6 border-white border-solid line-clamp-2'>
          {coupon.attributes.title}
        </span>
      </div>
      <div className='mt-8'>
        <span className='block px-6 py-4 text-s4 text-green bg-black'>{coupon.storeName}</span>
        <div className='flex flex-col gap-4 mt-6'>
          <dl className='grid grid-cols-[auto_1fr] gap-4'>
            <dt className='inline-block h-fit px-4 py-2 text-s1 text-black bg-white'>利用条件</dt>
            <dd className='text-s1 py-2'>{coupon.attributes.termsOfUse}</dd>
          </dl>
          <dl className='grid grid-cols-[auto_1fr] gap-4'>
            <dt className='inline-block h-fit px-4 py-2 text-s1 text-black bg-white'>提示条件</dt>
            <dd className='text-s1 py-2'>{coupon.attributes.presentationConditions}</dd>
          </dl>
          <dl className='grid grid-cols-[auto_1fr] gap-4'>
            <dt className='inline-block h-fit px-4 py-2 text-s1 text-black bg-white'>有効期限</dt>
            <dd className='text-s1 py-2'>
              {dayjs(coupon.attributes.dateOfExpiry).format('YYYY年MM月DD日')}まで
            </dd>
          </dl>
        </div>
      </div>
    </Link>
  )
}

export default Coupon
