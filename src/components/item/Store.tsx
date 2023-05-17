import { StrapiStore } from '@/type/strapi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Store = ({ store }: { store: StrapiStore }) => {
  return (
    <Link href={`${store.accountName}`}>
      <Image
        src={`http:localhost:${store.accountName}${store.attributes.icon.data.attributes.url}`}
        width={store.attributes.icon.data.attributes.width}
        height={store.attributes.icon.data.attributes.height}
        alt='test'
        className='w-full h-96 object-cover rounded-br-[6rem]'
      />
      <div className='flex flex-col gap-2 mt-8'>
        <span className='text-s6'>{store.storeName}</span>
        <span className='text-s2 opacity-60'>
          {store.region?.prefectures}
          {store.region?.city}
        </span>
      </div>
    </Link>
  )
}

export default Store
