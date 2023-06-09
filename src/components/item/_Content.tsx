import { useTimeAgo } from '@/hooks/useTimeAgo'
import { StrapiContent } from '@/type/strapi'
import Image from 'next/image'
import React from 'react'
import Bookmark from '../icon/Bookmark'
import Link from 'next/link'
import { CMSContents } from '@/type/microcms'

const Content = ({ content }: { content: CMSContents }) => {
  const { accountName, storeName, staff, id, thumbnail, title, createdAt } = content

  return (
    <Link
      href={`${accountName}/${staff.name}/${id}`}
      className='flex flex-col w-full h-full pt-12 pb-16 px-12 rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak'
    >
      <div className='flex justify-between items-center'>
        {/* staff */}
        <div className='flex items-center gap-4'>
          <Image
            src={staff.icon.url}
            width={staff.icon.width}
            height={staff.icon.height}
            alt={staff.name}
            className='w-16 h-16 rounded-full object-cover'
          />
          <span className='text-s2'>{staff.name}</span>
        </div>
        {/* <Bookmark /> */}
      </div>
      <div className=''>
        {/* main */}
        <div className='mt-8'>
          <Image
            src={thumbnail.url}
            width={thumbnail.width}
            height={thumbnail.height}
            alt={title}
            className='w-full h-60 object-cover'
          />
        </div>
        {/* sub */}
        <div className='mt-8'>
          <p className='text-s5 line-clamp-2'>{title}</p>
          <div className='flex justify-between items-center border-t mt-4 pt-4'>
            {/* store */}
            <div className=''>
              <p className='text-s1'>【{storeName}】</p>
            </div>
            {/* time */}
            <span className='text-s1'>{useTimeAgo(createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Content
