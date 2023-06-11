import Pagination from '@/components/common/Pagination'
import Content from '@/components/item/Content'
import Layout from '@/components/layout/Layout'
import { PAGE_SIZE } from '@/constants/strapi'
import { usePaginationGenerater } from '@/hooks/usePaginationGenerater'
import { StrapiContent } from '@/type/strapi'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Query = {
  page?: number | null
}

export const getServerSideProps: GetServerSideProps<{ contents: StrapiContent }> = async ({
  query,
}: {
  query: Query
}) => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllContents')
  let contents = await res.json()

  let totalCount = contents.length
  const page = query.page || 1
  const pages = Math.ceil(contents.length / PAGE_SIZE)

  // pageによる絞り込み
  if (page) {
    contents = contents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }

  return {
    props: {
      contents,
      page,
      pages,
      totalCount,
    },
  }
}

export default function Contents({
  contents,
  page,
  pages,
  totalCount,
}: {
  contents: StrapiContent[]
  page: number
  pages: number
  totalCount: number
}) {
  const router = useRouter()
  const { query } = router

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
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative w-layoutSm flex items-end gap-6 m-auto mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>スタッフ投稿</span>
          <span className='text-s7'>【{totalCount}】</span>
        </h1>
        <div className=''>
          <ul className='grid grid-cols-4 gap-4'>
            {contents.map((content, index) => (
              <li key={index}>
                <Content content={content} />
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
      </section>
    </Layout>
  )
}
