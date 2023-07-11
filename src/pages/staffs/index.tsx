import Button from '@/components/common/Button'
import Pagination from '@/components/common/Pagination'
import Tag from '@/components/common/Tag'
import TitlePage from '@/components/common/TitlePage'
import Staff from '@/components/item/Staff'
import Layout from '@/components/layout/Layout'
import { BREAKPOINT } from '@/constants/common'
import { GENDERS, CAREERS, PAGE_SIZE } from '@/constants/microcms'
import { usePaginationGenerater } from '@/hooks/usePaginationGenerater'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'
import { fetchCommonListDatas } from '@/lib/microcms/fetchCommonListDatas'
import { CMSStaff } from '@/type/microcms'
import { StrapiStaff } from '@/type/strapi'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Query = {
  career?: string | null
  gender?: string | null
  page?: number | null
}

export const getServerSideProps: GetServerSideProps<{
  staffs: CMSStaff[]
  page: number
  pages: number
  totalCount: number
}> = async ({ query }: { query: Query }) => {
  let staffs: CMSStaff[] = await fetchCommonListDatas('staffs')

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
    if (query.gender === '指定なし') {
      staffs = staffs
    } else {
      staffs = staffs.filter((staff) => staff.profile.gender[0] === query.gender)
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
  staffs: CMSStaff[]
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

  const windowDimensions = useWindowDimensions()

  return (
    <Layout>
      <section
        className='
          w-full m-auto mt-36
          md:w-layoutMd md:mt-60
       '
      >
        <TitlePage
          title='スタッフ'
          count={totalCount}
          className='
            w-layoutMbDefault mb-10 m-auto
            md:w-full md:mb-16
          '
        />
        {windowDimensions.width > BREAKPOINT && (
          <>
            {query.career || query.gender ? (
              <div
                className='
                flex flex-row flex-wrap gap-4 w-layoutMbDefault m-auto 
                md:mb-12 md:m-0
              '
              >
                {query.career && (
                  <Tag onClick={() => handleRemoveQuery(query.career)}>
                    キャリア
                    {query.career === '0' ? '1年未満' : `${query.career}年目〜`}
                  </Tag>
                )}
                {query.gender && (
                  <Tag onClick={() => handleRemoveQuery(query.gender)}>
                    {GENDERS.find((gender) => gender.label === query.gender)?.label}スタッフ
                  </Tag>
                )}
              </div>
            ) : null}
          </>
        )}

        <div
          className='
          grid gap-12
          md:grid-cols-[24rem_auto] md:justify-between md:gap-16
          '
        >
          {/* side */}
          <div
            className='
            flex flex-col gap-7 w-layoutMbDefault m-auto 
            md:w-full md:gap-16
            '
          >
            <div
              className='
              grid grid-cols-2 gap-4 
              md:flex md:flex-col md:gap-16
              '
            >
              {/* gender */}
              <div className=''>
                <span
                  className='
                  block w-full px-5 py-4 text-s4 bg-blackWeak rounded-sm
                  md:px-7 md:py-5 md:text-s5
                 '
                >
                  性別
                </span>
                <div
                  className='
                  flex flex-col gap-2 mt-6 ml-5 
                  md:gap-4 md:mt-8
                '
                >
                  {GENDERS.map((gender, index) => (
                    <div key={index} className='flex items-center gap-4'>
                      <label
                        className='relative flex cursor-pointer items-center rounded-full'
                        htmlFor={gender.label}
                      >
                        <input
                          type='radio'
                          id={gender.label}
                          value={gender.label}
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
                      <label
                        className='
                          w-full text-s2 cursor-pointer
                          md:text-s3
                        '
                        htmlFor={gender.label}
                      >
                        {gender.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* career */}
              <div className=''>
                <span
                  className='
                  block w-full px-5 py-4 text-s4 bg-blackWeak rounded-sm
                  md:px-7 md:py-5 md:text-s5'
                >
                  シーシャバー暦
                </span>
                <div className='mt-6'>
                  <select
                    name='career'
                    id='career'
                    onChange={handleSelectCareer}
                    className='
                      w-full px-4 py-4 rounded-sm text-black text-s2 appearance-none
                      md:px-6 md:py-4 md:text-s3
                     '
                    value={searchParams.career}
                  >
                    <>
                      <option value=''>キャリア何年？</option>
                      <option value='0'>1年未満</option>
                      {CAREERS.map((career, index) => (
                        <option key={index} value={career.year}>
                          {career.year}年目〜
                        </option>
                      ))}
                    </>
                  </select>
                </div>
              </div>
            </div>
            <Button onClick={handleSearchQuery}>検索する</Button>
            {windowDimensions.width < BREAKPOINT && (
              <div className='flex flex-row flex-wrap gap-4'>
                {query.career || query.gender ? (
                  <div
                    className='
                    flex flex-row flex-wrap gap-4 w-layoutMbDefault m-auto 
                    md:mb-12
                  '
                  >
                    {query.career && (
                      <Tag onClick={() => handleRemoveQuery(query.career)}>
                        キャリア
                        {query.career === '0' ? '1年未満' : `${query.career}年目〜`}
                      </Tag>
                    )}
                    {query.gender && (
                      <Tag onClick={() => handleRemoveQuery(query.gender)}>
                        {GENDERS.find((gender) => gender.label === query.gender)?.label}スタッフ
                      </Tag>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
          {/* main */}
          <div className='md:w-full'>
            <ul
              className='
                grid border-t border-white border-opacity-60
                md:grid-cols-2 md:gap-8 md:border-none 
              '
            >
              {staffs.map((staff, index) => (
                <li
                  key={index}
                  className='
                   border-b border-white border-opacity-60
                   md:h-fit md:border md:rounded-md md:overflow-hidden
                  '
                >
                  <Staff staff={staff} />
                </li>
              ))}
            </ul>
            {rangeWithDots.length > 1 ? (
              <div
                className='
                mt-12 
                md:mt-32
              '
              >
                <Pagination
                  rangeWithDots={rangeWithDots}
                  page={page}
                  handleSelectPage={handleSelectPage}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
  )
}
