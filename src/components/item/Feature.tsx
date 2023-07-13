import { chivo } from '@/pages/_app'
import { CMSFeature } from '@/type/microcms'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

const Feature = ({ feature }: { feature: CMSFeature }) => {
  return (
    <Link href={`features/${feature.id}`}>
      {/* thumbnail */}
      <Image
        src={feature.thumbnail.url}
        width={feature.thumbnail.width}
        height={feature.thumbnail.height}
        alt={feature.title}
        className='
          w-full h-96 object-cover
          md:h-80
        '
      />
      {/* content */}
      <div className='mt-8'>
        <div className='flex flex-row justify-between mb-2'>
          <time className={`text-s1 ${chivo.className}`}>
            {dayjs(feature.publishedAt).format('YYYY.MM.DD')}
          </time>
          <span className='text-s1'>#{feature.featureCategories.name}</span>
        </div>
        <div className='line-clamp-1'>
          <h2 className='inline text-s4 border-b border-white'>{feature.title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default Feature
