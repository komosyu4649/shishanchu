import { StrapiStaff } from '@/type/strapi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Staff = ({ staff }: { staff: StrapiStaff }) => {
  return (
    <div className='flex flex-col justify-between h-full p-12 rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak'>
      <div className=''>
        {/* name */}
        <div className='flex items-center gap-4'>
          <Image
            src={`http://localhost:${staff.accountName}${staff.icon.url}`}
            width={staff.icon.width}
            height={staff.icon.height}
            alt='test'
            className='w-20 h-20 rounded-full object-cover'
          />
          <span className='flex flex-col gap-1'>
            <span className='text-s5'>{staff.username}</span>
            {/* 店舗名 */}
            <span className='text-s2 opacity-60'>【{staff.storeName}】</span>
          </span>
        </div>
        {/* biography */}
        <p className='mt-8 text-s3 line-clamp-3'>{staff.biography}</p>
      </div>
      {/* link */}
      <div className='mt-8 flex justify-center'>
        <Link
          href={`/${staff.accountName}/${staff.username}`}
          className='inline-flex justify-center items-center px-16 py-6 text-green text-s4 rounded-full border-2 border-green border-solid'
        >
          スタッフを見る
        </Link>
      </div>
    </div>
  )
}

export default Staff
