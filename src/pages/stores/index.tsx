import Store from '@/components/item/Store'
import { StrapiStore } from '@/type/strapi'
import React from 'react'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllStores')
  const stores = await res.json()
  return {
    props: {
      stores,
    },
  }
}

export default function Stores({ stores }: { stores: StrapiStore[] }) {
  return (
    <section className='w-layoutMd m-auto mt-96'>
      <h1 className='relative flex items-end gap-6 mb-36 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
        <span className='text-s9'>スタッフ投稿</span>
        <span className='text-s7'>【{stores.length}】</span>
      </h1>
      <div className='grid grid-cols-[20rem_1fr] content-between gap-24'>
        {/* side */}
        <div className='flex flex-col gap-20'>
          {/* budget */}
          <div className=''>
            <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>予算</span>
            <div className='flex flex-col gap-2 mt-8'>
              <label htmlFor='none' className='flex flex-row gap-2'>
                <input type='radio' id='none' name='none' />
                <span className='text-s3'>2,000円~</span>
              </label>
              <label htmlFor='women' className='flex flex-row gap-2'>
                <input type='radio' id='women' name='women' />
                <span className='text-s3'>4,000円~</span>
              </label>
              <label htmlFor='men' className='flex flex-row gap-2'>
                <input type='radio' id='men' name='men' />
                <span className='text-s3'>6,000円~</span>
              </label>
            </div>
          </div>
          {/* area */}
          <div className=''>
            <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>エリア</span>
            <div className='mt-8'>
              <select name='area' id='area' className='w-full px-6 py-4 text-black text-s3'>
                <option value=''>エリアを選択する</option>
                <option value='tokyo'>東京</option>
                <option value='chiba'>千葉</option>
              </select>
            </div>
          </div>
          {/* facility */}
          {/* <div className=''>
            <ul className=''>
              <li className=''></li>
            </ul>
          </div> */}
        </div>
        {/* main */}
        <div className='w-layoutSm'>
          <ul className='grid grid-cols-3 gap-4'>
            {stores.map((store, index) => (
              <li key={index} className=''>
                <Store store={store} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}