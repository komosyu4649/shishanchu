import { CMSStaff } from '@/type/microcms'
import { StrapiStaff } from '@/type/strapi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Staff = ({ staff }: { staff: CMSStaff }) => {
  const { accountName, storeName, icon, name, biography } = staff
  return (
    <div className='flex flex-col h-full px-12 py-14 bg-blackWeak'>
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
            <span className='text-s4 line-clamp-1'>{name}</span>
            {storeName && <span className='text-s0 opacity-60 line-clamp-1'>【{storeName}】</span>}
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
      <p className='mt-6 text-s3Lt whitespace-break-spaces line-clamp-3'>{biography}</p>
    </div>
  )
}

export default Staff
