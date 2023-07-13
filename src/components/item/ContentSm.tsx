import { useTimeAgo } from '@/hooks/useTimeAgo'
import { StrapiContent } from '@/type/strapi'
import Image from 'next/image'
import React from 'react'
import Bookmark from '../icon/Bookmark'
import Link from 'next/link'
import { CMSContents } from '@/type/microcms'

const ContentSm = ({ content }: { content: CMSContents }) => {
  const { accountName, storeName, staff, id, thumbnail, title, createdAt } = content

  return (
    <Link href={`/${accountName}/${staff.name}/${id}`} className='flex flex-col'>
      {/* thumbnail */}
      <Image
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
        alt={title}
        className='w-full h-auto rounded-md object-cover'
      />
      {/* content */}
      <div
        className='
        mt-4
        md:mt-5
      '
      >
        <p
          className='
          text-s3 line-clamp-1
          md:text-s5d
          '
        >
          {title}
        </p>
        <div
          className='
          flex justify-between items-center gap-8 mt-3
          md:mt-4
          '
        >
          {/* staff */}
          <div className='flex items-center gap-4'>
            <Image
              src={staff.icon.url}
              width={staff.icon.width}
              height={staff.icon.height}
              alt={staff.name}
              className='w-12 h-12 rounded-full object-cover'
            />
            <span
              className='
                text-s0
                md:text-s1
              '
            >
              {staff.name}
            </span>
          </div>
          {/* time */}
          <span
            className='
            text-s0Lt
            md:text-s1Lt
          '
          >
            {useTimeAgo(createdAt)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ContentSm
