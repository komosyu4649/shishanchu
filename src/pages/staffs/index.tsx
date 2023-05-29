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
    <section className='w-layoutMd m-auto'>
      <h1>
        <span>スタッフ一覧</span>
        <span>【{staffs.length}】</span>
      </h1>
      <div className='grid grid-cols-[20rem_1fr] content-between'>
        {/* side */}
        <div className=''>
          {/* gender */}
          <div className=''>
            <span className=''>性別</span>
            <div className=''>
              <label htmlFor='none'>
                <input type='radio' id='none' name='none' />
                <span>指定なし</span>
              </label>
              <label htmlFor='women'>
                <input type='radio' id='women' name='women' />
                <span>女性</span>
              </label>
              <label htmlFor='men'>
                <input type='radio' id='men' name='men' />
                <span>男性</span>
              </label>
            </div>
          </div>
          {/* career */}
          <div className=''>
            <span className=''>シーシャバー暦</span>
            <div className=''>
              <select name='career' id='career'>
                <option value=''>キャリア何年？</option>
                <option value='1'>1年</option>
                <option value='2'>2年</option>
              </select>
            </div>
          </div>
          {/* area */}
          <div className=''>
            <span className=''>エリア</span>
            <div className=''>
              <select name='area' id='area'>
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
