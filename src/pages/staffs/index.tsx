import Staff from '@/components/item/Staff'
import Layout from '@/components/layout/Layout'
import { CAREERS } from '@/constants/strapi'
import { StrapiStaff } from '@/type/strapi'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Query = {
  career?: string | null
}

export const getServerSideProps: GetServerSideProps<{ staffs: StrapiStaff[] }> = async ({
  query,
}: {
  query: Query
}) => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllStaffs')
  let staffs: StrapiStaff[] = await res.json()

  if (query.career) {
    const currentYear = new Date().getFullYear()
    staffs = staffs.filter(
      (staff) => currentYear - new Date(staff.profile.career).getFullYear() >= Number(query.career),
    )
  }

  return {
    props: {
      staffs,
    },
  }
}

export default function Staffs({ staffs }: { staffs: StrapiStaff[] }) {
  const router = useRouter()
  const { query } = router

  const handleSelectCareer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, career: e.target.value },
    })
  }

  return (
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative flex items-end gap-6 mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
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
              <div className='mt-6'>
                <select
                  name='career'
                  id='career'
                  onChange={handleSelectCareer}
                  className='w-full px-4 py-4 rounded-lg text-black text-s3 appearance-none'
                  value={query.career}
                >
                  <option value=''>キャリア何年？</option>
                  <option value='0'>1年未満</option>
                  {CAREERS.map((career, index) => (
                    <option key={index} value={career.year}>
                      {career.year}年以上
                    </option>
                  ))}
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
    </Layout>
  )
}
