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
      <section
        className='
          w-layoutMbDefault m-auto mt-36
          md:w-layoutMd md:mt-60
        '
      >
        <TitlePage
          title='特集'
          count={totalCount}
          className='
            mb-10
            md:w-full md:mb-16'
        />
        <div
          className='
            grid gap-12
            md:grid-cols-[24rem_auto] md:justify-between md:gap-16'
        >
          {/* side */}
          <div className=''>
            {windowDimensions.width > BREAKPOINT ? (
              <div
                className='
                  rounded-md border-2 border-white border-opacity-60 border-solid px-10 py-8 bg-blackWeak
                '
              >
                <ul className='flex flex-row flex-wrap gap-y-4 gap-x-8 text-s2'>
                  {/* <ul className='flex flex-col gap-y-4 gap-x-8 text-s2'> */}
                  <li>
                    <Link href='/features'>#すべて</Link>
                  </li>
                  {featureCategories.map((featureCategory, index) => (
                    <li key={index}>
                      <Link href={`features?category=${featureCategory.name}`}>
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
          <div
            className='
              flex flex-col 
              md:w-layoutSm
            '
          >
            <ul
              className='
                grid md:grid-cols-3 gap-y-16
                md:gap-x-8'
            >
              {features.map((feature, index) => (
                <li key={index}>
                  <Feature feature={feature} />
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

export default Features
