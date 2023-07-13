import Layout from '@/components/layout/Layout'
import {
  MICROCMS_ENDPOINT_CMS_FEATURES,
  MICROCMS_ENDPOINT_CMS_FEATURE_CATEGORIES,
} from '@/constants/microcms'
import { getMicroCMSData, getMicroCMSDataList } from '@/lib/microcms/fetchCMS'
import { fetchCommonData } from '@/lib/microcms/fetchCommonData'
import { fetchCommonListDatas } from '@/lib/microcms/fetchCommonListDatas'
import dayjs from 'dayjs'
import fm from 'front-matter'
import { marked } from 'marked'
import Image from 'next/image'
import Link from 'next/link'
import { chivo } from '../_app'
import { CMSFeature, CMSFeatureCategory } from '@/type/microcms'
import TitlePage from '@/components/common/TitlePage'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'
import { BREAKPOINT } from '@/constants/common'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
  const featuresData = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURES)
  return {
    paths: featuresData.map((feature) => ({
      params: {
        id: feature.id.toString(),
      },
    })),
    fallback: false,
  }
}

type Params = {
  params: {
    id: string
  }
}

export const getStaticProps = async (params: Params) => {
  const { id } = params.params
  const featureData = await getMicroCMSData(MICROCMS_ENDPOINT_CMS_FEATURES, id)
  const parsedMarkdown = fm(featureData.content)
  const htmlString = marked(parsedMarkdown.body)
  const featureCategories = await getMicroCMSDataList(MICROCMS_ENDPOINT_CMS_FEATURE_CATEGORIES)
  return {
    props: {
      featureData,
      htmlString,
      featureCategories,
    },
  }
}

export default function FeatureDetail({
  featureData,
  htmlString,
  featureCategories,
}: {
  featureData: CMSFeature
  htmlString: string
  featureCategories: CMSFeatureCategory[]
}) {
  const { title, content, publishedAt, thumbnail } = featureData

  const router = useRouter()

  const [searchParams, setSearchParams] = useState({
    category: '',
  })

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, category: e.target.value })
    router.push({
      pathname: '/features',
      query: {
        category: e.target.value,
      },
    })
  }

  const windowDimensions = useWindowDimensions()

  return (
    <Layout>
      <article
        className='
          flex flex-col justify-center gap-14 w-layoutMbDefault m-auto mt-36
          md:w-layoutMd md:flex-row md:gap-24 md:mt-60
        '
      >
        {/* side */}
        <div className='md:w-80'>
          <TitlePage title='特集' />
        </div>
        {/* main */}
        <div
          className='
            flex flex-col 
            md:w-[68rem]
          '
        >
          <time dateTime={publishedAt} className={`text-s1 ${chivo.className}`}>
            {dayjs(publishedAt).format('YYYY.MM.DD')}
          </time>
          <span className='mt-2 text-s1'>#{featureData.featureCategories.name}</span>
          <h2
            className='
              mt-8 mb-12 text-s7 
              md:mt-16 md:text-s9
            '
          >
            {title}
          </h2>
          <Image
            src={thumbnail.url}
            width={thumbnail.width}
            height={thumbnail.height}
            alt={title}
            className='mb-12'
          />
          <div
            className='prose prose-h2:px-8 prose-h2:py-6 prose-h2:rounded-lg prose-h2:border-2 prose-h2:border-white prose-h2:border-opacity-60 prose-h2:border-solid prose-h2:bg-black prose-h2:text-white prose-h2:text-proseH2 prose-h3:text-proseH3 prose-h3:text-white prose-h3:border-b-2 prose-h3:border-white prose-h3:border-opacity-60 prose-h3:border-solid prose-h3:py-2 prose-h3:px-4 prose-h4:text-proseH4 prose-h4:text-white prose-h4:border-b-2 prose-h4:border-white prose-h4:border-opacity-60 prose-h4:border-solid prose-h4:py-2 prose-h4:px-4 prose-h5:text-proseH5 prose-h5:text-white prose-h5:border-b-2 prose-h5:border-white prose-h5:border-opacity-60 prose-h5:border-solid prose-h5:py-2 prose-h5:px-4 prose-h6:text-proseH6 prose-h6:text-white prose-h6:border-b-2 prose-h6:border-white prose-h6:border-opacity-60 prose-h6:border-solid prose-h6:py-2 prose-h6:px-4 prose-p:text-s5LhLgLt prose-li:text-s5LhLgLt prose-li:m-0 text-white max-w-none'
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
        </div>
      </article>
    </Layout>
  )
}
