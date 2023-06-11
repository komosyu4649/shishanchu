import { useTimeAgo } from '@/hooks/useTimeAgo'
import { StrapiContent } from '@/type/strapi'
import Image from 'next/image'
import React from 'react'
import Bookmark from '../icon/Bookmark'
import Link from 'next/link'

const Content = ({ content }: { content: StrapiContent }) => {
  const { id, storeName, accountName, attributes } = content

  return (
    // <li className='h-fit rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak'>
    <Link
      href={`${accountName}/${attributes.users_permissions_user.data.attributes.username}/${id}`}
      className='flex flex-col justify-between w-full h-full pt-12 pb-16 px-12 rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak'
    >
      <div className='flex justify-between items-center'>
        {/* staff */}
        <div className='flex items-center gap-4'>
          <Image
            src={`http:localhost:${accountName}${attributes.users_permissions_user.data.attributes.icon.data.attributes.url}`}
            width={attributes.users_permissions_user.data.attributes.icon.data.attributes.width}
            height={attributes.users_permissions_user.data.attributes.icon.data.attributes.height}
            alt='test'
            className='w-16 h-16 rounded-full object-cover'
          />
          <span className='text-s2'>
            {attributes.users_permissions_user.data.attributes.username}
          </span>
        </div>
        <Bookmark />
      </div>
      <div className=''>
        {/* main */}
        <div className='mt-8'>
          <Image
            src={`http:localhost:${accountName}${attributes.thumbnail.data.attributes.url}`}
            width={attributes.thumbnail.data.attributes.width}
            height={attributes.thumbnail.data.attributes.height}
            alt='test'
            className='w-full h-60 object-cover'
          />
        </div>
        {/* sub */}
        <div className='mt-8'>
          <p className='text-s5 line-clamp-2'>{attributes.title}</p>
          <div className='flex justify-between items-center border-t mt-4 pt-4'>
            {/* store */}
            <div className=''>
              <p className='text-s1'>【{storeName}】</p>
            </div>
            {/* time */}
            <span className='text-s1'>{useTimeAgo(attributes.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
    // </li>
  )
}

export default Content
