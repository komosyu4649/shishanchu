import Staff from '@/components/item/Staff'
import { StrapiStaff } from '@/type/strapi'
import React from 'react'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllStaffs')
  const staffs = await res.json()
  return {
    props: {
      staffs,
    },
  }
}

export default function index({ staffs }: { staffs: StrapiStaff[] }) {
  return (
    <section className='w-layoutMd m-auto mt-96'>
      <h1 className='relative flex items-end gap-6 mb-36 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
        <span className='text-s9'>スタッフ一覧</span>
        <span className='text-s7'>【{staffs.length}】</span>
      </h1>
      <div className='grid grid-cols-[20rem_1fr] content-between gap-24'>
        {/* side */}
        <div className='flex flex-col gap-20'>
          {/* gender */}
          <div className=''>
            <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>性別</span>
            <div className='flex flex-col gap-2 mt-8'>
              <label htmlFor='none' className='flex flex-row gap-2'>
                <input type='radio' id='none' name='none' />
                <span className='text-s3'>指定なし</span>
              </label>
              <label htmlFor='women' className='flex flex-row gap-2'>
                <input type='radio' id='women' name='women' />
                <span className='text-s3'>女性</span>
              </label>
              <label htmlFor='men' className='flex flex-row gap-2'>
                <input type='radio' id='men' name='men' />
                <span className='text-s3'>男性</span>
              </label>
            </div>
          </div>
          {/* career */}
          <div className=''>
            <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>
              シーシャバー暦
            </span>
            <div className='mt-8'>
              <select name='career' id='career' className='w-full px-6 py-4 text-black text-s3'>
                <option value=''>キャリア何年？</option>
                <option value='1'>1年</option>
                <option value='2'>2年</option>
              </select>
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
        </div>
        {/* main */}
        <div className='w-layoutSm'>
          <ul className='grid grid-cols-3 gap-4'>
            {staffs.map((staff, index) => (
              <li key={index}>
                <Staff staff={staff} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
