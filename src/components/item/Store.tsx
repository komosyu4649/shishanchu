import { CMSStore } from '@/type/microcms'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Store = ({ store }: { store: CMSStore }) => {
  const { icon, storeName, information } = store
  console.log(store)
  return (
    <Link href={`${store.accountName}`}>
      <Image
        src={icon.url}
        width={icon.width}
        height={icon.height}
        alt={storeName}
        className='w-full h-96 object-cover rounded-br-[6rem]'
      />
      <div className='flex flex-col gap-2 mt-8'>
        <span className='text-s6 line-clamp-1'>{storeName}</span>
        <span className='text-s2 opacity-60'>{information.address}</span>
      </div>
    </Link>
  )
}

export default Store
