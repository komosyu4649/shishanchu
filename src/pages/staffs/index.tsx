import Button from '@/components/common/Button'
import Pagination from '@/components/common/Pagination'
import Tag from '@/components/common/Tag'
import Staff from '@/components/item/Staff'
import Layout from '@/components/layout/Layout'
import { CAREERS, GENDERS, PAGE_SIZE } from '@/constants/strapi'
import { usePaginationGenerater } from '@/hooks/usePaginationGenerater'
import { StrapiStaff } from '@/type/strapi'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Query = {
  career?: string | null
  gender?: string | null
  page?: number | null
}

export const getServerSideProps: GetServerSideProps<{ staffs: StrapiStaff[] }> = async ({
  query,
}: {
  query: Query
}) => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllStaffs')
  let staffs: StrapiStaff[] = await res.json()

  if (query.career) {
    const careerYear = Number(query.career)
    const currentYear = new Date().getFullYear()
    if (careerYear >= 0 && careerYear < 1) {
      staffs = staffs.filter(
        (staff) =>
          currentYear - new Date(staff.profile.career).getFullYear() >= 0 &&
          currentYear - new Date(staff.profile.career).getFullYear() < 1,
      )
    } else {
      staffs = staffs.filter(
        (staff) => currentYear - new Date(staff.profile.career).getFullYear() >= careerYear,
      )
    }
  }

  if (query.gender) {
    if (query.gender === 'all') {
      staffs = staffs
    } else {
      staffs = staffs.filter((staff) => staff.profile.gender === query.gender)
    }
  }

  let totalCount = staffs.length
  const page = query.page || 1
  const pages = Math.ceil(staffs.length / PAGE_SIZE)

  // pageによる絞り込み
  if (page) {
    staffs = staffs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }

  return {
    props: {
      staffs,
      page,
      pages,
      totalCount,
    },
  }
}

export default function Staffs({
  staffs,
  page,
  pages,
  totalCount,
}: {
  staffs: StrapiStaff[]
  page: number
  pages: number
  totalCount: number
}) {
  const router = useRouter()
  const { query } = router

  const rangeWithDots = usePaginationGenerater(page, pages)

  const [searchParams, setSearchParams] = useState({
    career: '',
    gender: '',
  })

  const handleSelectPage = (pageNumber: number | string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        page: pageNumber,
      },
    })
  }

  const handleSelectCareer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      career: e.target.value,
    })
  }

  const handleSelectGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      gender: e.target.value,
    })
  }

  const handleSearchQuery = () => {
    router.push({
      pathname: router.pathname,
      query: {
        career: searchParams.career,
        gender: searchParams.gender,
      },
    })
  }

  const handleRemoveQuery = (queryItem?: string | string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        career: query.career === queryItem ? '' : query.career,
        gender: query.gender === queryItem ? '' : query.gender,
      },
    })
  }

  return (
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative flex items-end gap-6 mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>スタッフ一覧</span>
          <span className='text-s7'>【{totalCount}】</span>
        </h1>
        {query.career || query.gender ? (
          <div className='flex flex-row flex-wrap gap-4 mb-12'>
            {query.career && (
              <Tag onClick={() => handleRemoveQuery(query.career)}>
                キャリア
                {query.career === '0' ? '1年未満' : `${query.career}年目〜`}
              </Tag>
            )}
            {query.gender && (
              <Tag onClick={() => handleRemoveQuery(query.gender)}>
                {GENDERS.find((gender) => gender.value === query.gender)?.label}スタッフ
              </Tag>
            )}
          </div>
        ) : null}
        <div className='grid grid-cols-[20rem_1fr] content-between gap-24'>
          {/* side */}
          <div className='flex flex-col gap-20'>
            {/* gender */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>性別</span>
              <div className='flex flex-col gap-4 mt-8'>
                {GENDERS.map((gender, index) => (
                  <div key={index} className='flex items-center gap-4'>
                    <label
                      className='relative flex cursor-pointer items-center rounded-full'
                      htmlFor={gender.value}
                    >
                      <input
                        type='radio'
                        id={gender.value}
                        value={gender.value}
                        name='gender'
                        onChange={handleSelectGender}
                        className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-green transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green checked:before:bg-green hover:before:opacity-10"
                      />
                      <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green opacity-0 transition-opacity peer-checked:opacity-100'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-3.5 w-3.5'
                          viewBox='0 0 16 16'
                          fill='currentColor'
                        >
                          <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
                        </svg>
                      </div>
                    </label>
                    <label className='w-full text-s3 cursor-pointer' htmlFor={gender.value}>
                      {gender.label}
                    </label>
                  </div>
                ))}
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
                  value={searchParams.career}
                >
                  <option value=''>キャリア何年？</option>
                  <option value='0'>1年未満</option>
                  {CAREERS.map((career, index) => (
                    <option key={index} value={career.year}>
                      {career.year}年目〜
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button onClick={handleSearchQuery} className='bg-green'>
              検索する
            </Button>
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
            <Pagination
              rangeWithDots={rangeWithDots}
              page={page}
              handleSelectPage={handleSelectPage}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}
