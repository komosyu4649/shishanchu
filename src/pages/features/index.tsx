import Layout from '@/components/layout/Layout'
import {
  MICROCMS_ENDPOINT_CMS_FEATURES,
  MICROCMS_ENDPOINT_CMS_FEATURE_CATEGORIES,
  PAGE_SIZE,
} from '@/constants/microcms'
import { getMicroCMSDataList } from '@/lib/microcms/fetchCMS'
import { CMSFeature, CMSFeatureCategory } from '@/type/microcms'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { chivo } from '../_app'
import { useRouter } from 'next/router'
import Pagination from '@/components/common/Pagination'
import { usePaginationGenerater } from '@/hooks/usePaginationGenerater'
import Feature from '@/components/item/Feature'
import TitlePage from '@/components/common/TitlePage'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'
import { BREAKPOINT } from '@/constants/common'

type Query = {
  category?: string | null
  page?: string | null
}

export const getServerSideProps = async ({ query }: { query: Query }) => {
  let features = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURES)
  if (query.category) {
    features = features.filter((features) => features.featureCategories.name === query.category)
  }
  const featureCategories = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURE_CATEGORIES)

  let totalCount = features.length
  const page = Number(query.page) || 1
  const pages = Math.ceil(features.length / PAGE_SIZE)

  // pageによる絞り込み
  if (page) {
    features = features.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }
  return {
    props: {
      features,
      featureCategories,
      page,
      pages,
      totalCount,
    },
  }
}

const Features = ({
  features,
  featureCategories,
  page,
  pages,
  totalCount,
}: {
  features: CMSFeature[]
  featureCategories: CMSFeatureCategory[]
  page: number
  pages: number
  totalCount: number
}) => {
  const router = useRouter()
  const { query } = router
  const categoryName = query.category || ''

  const [searchParams, setSearchParams] = useState({
    category: '',
  })

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, category: e.target.value })
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        category: e.target.value,
      },
    })
  }

  const rangeWithDots = usePaginationGenerater(page, pages)
  const handleSelectPage = (pageNumber: number | string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        page: pageNumber,
      },
    })
  }

  const windowDimensions = useWindowDimensions()

  return (
    <Layout>
      <main className='flex flex-col w-layoutMbDefault m-auto md:flex-row justify-center gap-16 md:gap-24 mt-36'>
        {/* side */}
        <div className='md:w-80'>
          {/* <h1 className='relative md:w-layoutSm gap-6 m-auto mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
            <span className='text-s9'>
              {categoryName}特集【{totalCount}】
            </span>
          </h1> */}
          <TitlePage title='特集' count={totalCount} className='mb-10' />
          {windowDimensions.width > BREAKPOINT ? (
            <div className='rounded-3xl border-2 border-white border-opacity-60 border-solid p-10 bg-blackWeak'>
              <ul className='flex flex-col gap-4'>
                <li>
                  <Link href='/features' className='text-s3'>
                    #すべて
                  </Link>
                </li>
                {featureCategories.map((featureCategory, index) => (
                  <li key={index}>
                    <Link href={`features?category=${featureCategory.name}`} className='text-s3'>
                      #{featureCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <select
              name='category'
              id='category'
              onChange={handleSelectCategory}
              value={searchParams.category}
              className='w-full px-10 py-6 bg-blackWeak border border-white border-opacity-60 rounded-xl text-s1Lt appearance-none'
            >
              <option value=''>すべて</option>
              {featureCategories.map((featureCategory, index) => (
                <option key={index} value={featureCategory.name}>
                  {featureCategory.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* main */}
        <div className='flex flex-col md:w-[92rem]'>
          <ul className='grid md:grid-cols-3 md:gap-x-8 gap-y-16'>
            {features.map((feature, index) => (
              <li key={index}>
                <Feature feature={feature} />
              </li>
            ))}
          </ul>
          {rangeWithDots.length > 1 ? (
            <div className='mt-12 md:mt-32'>
              <Pagination
                rangeWithDots={rangeWithDots}
                page={page}
                handleSelectPage={handleSelectPage}
              />
            </div>
          ) : null}
        </div>
      </main>
    </Layout>
  )
}

export default Features
