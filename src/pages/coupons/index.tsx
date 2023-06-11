import { StrapiCoupon } from '@/type/strapi'
import React, { useState } from 'react'
import Coupon from '@/components/item/Coupon'
import Layout from '@/components/layout/Layout'
import { COUPON_TYPES, DEADLINES, PAGE_SIZE, REGIONS } from '@/constants/strapi'
import Button from '@/components/common/Button'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Tag from '@/components/common/Tag'
import { usePaginationGenerater } from '@/hooks/usePaginationGenerater'
import { chivo } from '../_app'
import Pagination from '@/components/common/Pagination'

type Query = {
  type?: string | null
  deadline?: string | null
  area?: string | null
  page?: number | null
}

export const getServerSideProps: GetServerSideProps<{ coupons: StrapiCoupon[] }> = async ({
  query,
}: {
  query: Query
}) => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllCoupons')
  let coupons = await res.json()

  // typeによる絞り込み
  if (query.type) {
    if (query.type === 'all') {
      coupons = coupons
    } else {
      coupons = coupons.filter((coupon: StrapiCoupon) => {
        return coupon.attributes.types === query.type
      })
    }
  }

  // deadlineによる絞り込み
  if (query.deadline) {
    const deadlineMonth = Number(query.deadline)
    const currentMonth = new Date().getMonth()

    if (deadlineMonth === 1 || deadlineMonth === 3 || deadlineMonth === 6) {
      coupons = coupons.filter((coupon: StrapiCoupon) => {
        const couponMonth = new Date(coupon.attributes.dateOfExpiry).getMonth()
        return couponMonth - currentMonth <= deadlineMonth
      })
    }
  }

  // areaによる絞り込み
  if (query.area) {
    coupons = coupons.filter((coupon: StrapiCoupon) => {
      return coupon.region?.prefectures === query.area
    })
  }

  let totalCount = coupons.length
  const page = query.page || 1
  const pages = Math.ceil(totalCount / PAGE_SIZE)

  // pageによる絞り込み
  if (page) {
    coupons = coupons.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }

  return {
    props: {
      coupons,
      page,
      pages,
      totalCount,
    },
  }
}

export default function Coupons({
  coupons,
  page,
  pages,
  totalCount,
}: {
  coupons: StrapiCoupon[]
  page: number
  pages: number
  totalCount: number
}) {
  const router = useRouter()
  const { query } = router

  const rangeWithDots = usePaginationGenerater(page, pages)

  const [searchParams, setSearchParams] = useState({
    type: '',
    deadline: '',
    area: '',
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

  const handleSelectType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectCareer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const handleSearchQuery = () => {
    router.push({
      pathname: router.pathname,
      query: {
        type: searchParams.type,
        deadline: searchParams.deadline,
        area: searchParams.area,
      },
    })
  }

  const handleRemoveQuery = (queryItem?: string | string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        type: query.type === queryItem ? '' : query.type,
        deadline: query.deadline === queryItem ? '' : query.deadline,
        area: query.area === queryItem ? '' : query.area,
      },
    })
  }

  return (
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative flex items-end gap-6 mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>クーポン一覧</span>
          <span className='text-s7'>【{totalCount}】</span>
        </h1>
        {query.type || query.deadline || query.area ? (
          <div className='flex flex-row flex-wrap gap-4 mb-12'>
            {query.type && (
              <Tag onClick={() => handleRemoveQuery(query.type)}>
                特典内容 : {COUPON_TYPES.find((type) => type.value === query.type)?.label}
              </Tag>
            )}
            {query.deadline && (
              <Tag onClick={() => handleRemoveQuery(query.deadline)}>
                有効期限 : {query.deadline}ヶ月以内
              </Tag>
            )}
            {query.area && (
              <Tag onClick={() => handleRemoveQuery(query.area)}>
                {REGIONS.find((region) => region.prefectures === query.area)?.prefectures}
              </Tag>
            )}
          </div>
        ) : null}
        <div className='grid grid-cols-[20rem_1fr] content-between gap-24'>
          {/* side */}
          <div className='flex flex-col gap-20'>
            {/* type */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>
                特典内容
              </span>
              <div className='flex flex-col gap-4 mt-8'>
                {COUPON_TYPES.map((type, index) => (
                  <div key={index} className='flex items-center gap-4'>
                    <label
                      className='relative flex cursor-pointer items-center rounded-full'
                      htmlFor={type.value}
                    >
                      <input
                        type='radio'
                        id={type.value}
                        value={type.value}
                        name='type'
                        onChange={handleSelectType}
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
                    <label className='w-full text-s3 cursor-pointer' htmlFor={type.value}>
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* deadline */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>期限</span>
              <div className='mt-6'>
                <select
                  name='deadline'
                  id='deadline'
                  onChange={handleSelectCareer}
                  className='w-full px-4 py-4 rounded-lg text-black text-s3 appearance-none'
                  value={searchParams.deadline}
                >
                  <option value=''>いつまで使える？</option>
                  {DEADLINES.map((deadline, index) => (
                    <option key={index} value={deadline.month}>
                      {deadline.month}ヶ月以内
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* area */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>エリア</span>
              <div className='mt-6'>
                <select
                  name='area'
                  id='area'
                  onChange={handleSelectArea}
                  value={searchParams.area}
                  className='w-full px-4 py-4 rounded-lg text-black text-s3 appearance-none'
                >
                  <option value=''>エリアを選択する</option>
                  {REGIONS.map((region, index) => (
                    <option key={index} value={region.prefectures}>
                      {region.prefectures}
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
              {coupons.map((coupon, index) => (
                <li key={index} className=''>
                  <Coupon coupon={coupon} />
                </li>
              ))}
            </ul>
            {rangeWithDots.length > 1 ? (
              <div className='mt-32'>
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
