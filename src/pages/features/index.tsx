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
import React from 'react'
import { chivo } from '../_app'
import { useRouter } from 'next/router'
import Pagination from '@/components/common/Pagination'
import { usePaginationGenerater } from '@/hooks/usePaginationGenerater'

type Query = {
  category?: string | null
  page?: string | null
}

export const getServerSideProps = async ({ query }: { query: Query }) => {
  const featuresData = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURES)
  let features = featuresData.contents
  if (query.category) {
    features = features.filter((features) => features.featureCategories.name === query.category)
  }
  const featureCategoriesData = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURE_CATEGORIES)
  const featureCategories = featureCategoriesData.contents

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

  return (
    <Layout>
      <main className='flex flex-row justify-center gap-24 mt-36'>
        {/* side */}
        <div className='w-80'>
          <h1 className='relative w-layoutSm gap-6 m-auto mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
            <span className='text-s9'>
              {categoryName}特集【{totalCount}】
            </span>
          </h1>
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
        </div>
        {/* main */}
        <div className='flex flex-col w-[92rem]'>
          <ul className='grid grid-cols-3 gap-x-8 gap-y-16'>
            {features.map((features, index) => (
              <li key={index}>
                <Link href={`features/${features.id}`}>
                  <Image
                    src={features.thumbnail.url}
                    width={features.thumbnail.width}
                    height={features.thumbnail.height}
                    alt={features.title}
                    className='h-80 object-cover'
                  />
                  <div className='mt-8'>
                    <div className='flex flex-row justify-between mb-2'>
                      <time className={`text-s1 ${chivo.className}`}>
                        {dayjs(features.publishedAt).format('YYYY.MM.DD')}
                      </time>
                      <span className='text-s1'>#{features.featureCategories.name}</span>
                    </div>
                    <h2 className='inline text-s4 border-b-2 border-white'>{features.title}</h2>
                  </div>
                </Link>
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
      </main>
    </Layout>
  )
}

export default Features
