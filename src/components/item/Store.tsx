import { CMSStore } from '@/type/microcms'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Store = ({ store }: { store: CMSStore }) => {
  const { icon, storeName, information } = store
  return (
    <Link href={`${store.accountName}`}>
      {/* thumbnail */}
      <Image
        src={icon.url}
        width={icon.width}
        height={icon.height}
        alt={storeName}
        className='w-auto h-auto object-cover rounded-lg aspect-square'
      />
      {/* content */}
      <div className='flex flex-col gap-1 mt-4'>
        <span className='text-s4 line-clamp-1'>{storeName}</span>
        <span className='text-s1Lt opacity-60'>{information.address}</span>
      </div>
    </Link>
  )
}

export default Store
