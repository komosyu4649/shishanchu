import { CMSStaff } from '@/type/microcms'
import { StrapiStaff } from '@/type/strapi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Staff = ({ staff }: { staff: CMSStaff }) => {
  const { accountName, storeName, icon, name, biography } = staff
  return (
    <div className='flex flex-col justify-between h-full p-12 bg-blackWeak border-b border-white border-opacity-60'>
      <div className='grid grid-cols-[1fr_auto] gap-6 justify-between items-center'>
        {/* name */}
        <div className='flex items-center gap-4'>
          <Image
            src={icon.url}
            width={icon.width}
            height={icon.height}
            alt={name}
            className='w-20 h-20 rounded-full object-cover'
          />
          <span className='flex flex-col gap-1'>
            <span className='text-s4'>{name}</span>
            <span className='text-s0 opacity-60'>【{storeName}】</span>
          </span>
        </div>
        {/* link */}
        <Link
          href={`/${accountName}/${name}`}
          className='inline-flex justify-center items-center h-fit px-7 py-4 text-green text-s1 rounded-xl border-2 border-green border-solid'
        >
          詳しく見る
        </Link>
      </div>
      {/* biography */}
      <p className='mt-5 text-s3Lt whitespace-pre line-clamp-3'>{biography}</p>
    </div>
  )
}

export default Staff
