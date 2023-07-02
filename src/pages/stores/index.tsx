import Button from '@/components/common/Button'
import Pagination from '@/components/common/Pagination'
import Tag from '@/components/common/Tag'
import Store from '@/components/item/Store'
import Layout from '@/components/layout/Layout'
import { BUDGETS, PAGE_SIZE, REGIONS } from '@/constants/strapi'
import { usePaginationGenerater } from '@/hooks/usePaginationGenerater'
import { fetchCommonJsonDatas } from '@/lib/microcms/fetchCommonJsonDatas'
import { CMSStore } from '@/type/microcms'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Query = {
  area?: string | null
  budgetMin?: string | null
  budgetMax?: string | null
  page?: number | null
}

export const getServerSideProps: GetServerSideProps<{
  stores: CMSStore[]
  page: number
  pages: number
  totalCount: number
}> = async ({ query }: { query: Query }) => {
  let stores: CMSStore[] = await fetchCommonJsonDatas('store')

  if (query.area) {
    stores = stores.filter((store) => store.information?.address.includes(query.area || ''))
  }

  if (query.budgetMin) {
    const budgetMinNumber = Number(query.budgetMin)
    stores = stores.filter((store) => store.information?.budget[0]?.lowest >= budgetMinNumber)
  }

  if (query.budgetMax) {
    const budgetMaxNumber = Number(query.budgetMax)
    stores = stores.filter((store) => store.information?.budget[0]?.highest <= budgetMaxNumber)
  }

  let totalCount = stores.length
  const page = query.page || 1
  const pages = Math.ceil(stores.length / PAGE_SIZE)

  // pageによる絞り込み
  if (page) {
    stores = stores.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }

  return {
    props: {
      stores,
      page,
      pages,
      totalCount,
    },
  }
}

export default function Stores({
  stores,
  page,
  pages,
  totalCount,
}: {
  stores: CMSStore[]
  page: number
  pages: number
  totalCount: number
}) {
  const router = useRouter()
  const { query } = router

  const rangeWithDots = usePaginationGenerater(page, pages)

  const [searchParams, setSearchParams] = useState({
    area: '',
    budgetMin: '',
    budgetMax: '',
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

  const handleSelectArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, area: e.target.value })
  }

  const handleSelectBudgetMin = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, budgetMin: e.target.value })
  }

  const handleSelectBudgetMax = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, budgetMax: e.target.value })
  }

  const handleRemoveQuery = (queryItem?: string | string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        area: query.area === queryItem ? '' : query.area,
        budgetMin: query.budgetMin === queryItem ? '' : query.budgetMin,
        budgetMax: query.budgetMax === queryItem ? '' : query.budgetMax,
      },
    })
  }

  const handleSearchQuery = () => {
    router.push({
      pathname: router.pathname,
      query: {
        area: searchParams.area,
        budgetMin: searchParams.budgetMin,
        budgetMax: searchParams.budgetMax,
      },
    })
  }

  return (
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative flex items-end gap-6 mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>店舗</span>
          <span className='text-s7'>【{totalCount}】</span>
        </h1>
        <div className='flex flex-row flex-wrap gap-4'>
          {query.budgetMin && (
            <Tag onClick={() => handleRemoveQuery(query.budgetMin)}>
              下限予算 : {query.budgetMin}円
            </Tag>
          )}
          {query.budgetMax && (
            <Tag onClick={() => handleRemoveQuery(query.budgetMax)}>
              上限予算 : {query.budgetMax}円
            </Tag>
          )}
          {query.area && <Tag onClick={() => handleRemoveQuery(query.area)}>{query.area}</Tag>}
        </div>
        <div className='grid grid-cols-[20rem_1fr] content-between gap-24 mt-12'>
          {/* side */}
          <div className='flex flex-col gap-16'>
            {/* budget */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>予算</span>
              <div className='grid grid-cols-[1fr_auto_1fr] gap-2 items-center mt-6'>
                <select
                  name='budgetMin'
                  id='budgetMin'
                  onChange={handleSelectBudgetMin}
                  className='w-full px-4 py-4 rounded-lg text-black text-s3 appearance-none'
                  value={searchParams.budgetMin}
                >
                  <option value=''>下限なし</option>
                  {BUDGETS.map((budget, index) => (
                    <option key={index} value={budget.price}>
                      {budget.price.toLocaleString()}円
                    </option>
                  ))}
                </select>
                <span className='text-s1'>〜</span>
                <select
                  name='budgetMax'
                  id='budgetMax'
                  onChange={handleSelectBudgetMax}
                  className='w-full px-4 py-4 rounded-lg text-black text-s3 appearance-none'
                  value={searchParams.budgetMax}
                >
                  <option value=''>上限なし</option>
                  {BUDGETS.map((budget, index) => (
                    <option key={index} value={budget.price}>
                      {budget.price.toLocaleString()}円
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
                  onChange={(e) => handleSelectArea(e)}
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
            {/* facility */}
            {/* <div className=''>
            <ul className=''>
              <li className=''></li>
            </ul>
          </div> */}
            <Button onClick={handleSearchQuery} className='bg-green'>
              検索する
            </Button>
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
