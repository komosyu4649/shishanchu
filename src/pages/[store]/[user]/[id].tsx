import Button from '@/components/common/Button'
import Staff from '@/components/item/Staff'
import Layout from '@/components/layout/Layout'
import { BREAKPOINT } from '@/constants/common'
import { ACCOUNTS } from '@/constants/microcms'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'
import { fetchCommonData } from '@/lib/microcms/fetchCommonData'
import { fetchCommonJsonDatas } from '@/lib/microcms/fetchCommonJsonDatas'
import { fetchCommonListDatas } from '@/lib/microcms/fetchCommonListDatas'
import { chivo } from '@/pages/_app'
import { Account, CMSContents } from '@/type/microcms'
import { StrapiContent } from '@/type/strapi'
import axios from 'axios'
import dayjs from 'dayjs'
import fm from 'front-matter'
import { marked } from 'marked'
import Image from 'next/image'
import Link from 'next/link'

// [store]/[user]/[id].tsxのパスをgetStaticPathで作る
export const getStaticPaths = async () => {
  // const contents = await fetch('http://localhost:3000/api/strapi/getAllContents')
  // const contentsData: StrapiContent[] = await contents.json()
  const contentsData = await fetchCommonListDatas('contents')
  return {
    paths: contentsData.map((content) => ({
      params: {
        store: content.accountName,
        user: decodeURI(content.staff.name),
        id: content.id.toString(),
      },
    })),
    fallback: false,
  }
}

type Params = {
  params: {
    store: string
    user: string
    id: string
  }
}

export const getStaticProps = async (params: Params) => {
  const { store, user, id } = params.params
  const contentData = await fetchCommonData(store, 'contents', id)
  // console.log(1, store)
  const accuntData = ACCOUNTS.find((account) => account.name === store)
  // const storeDatas = await fetchCommonJsonDatas('store')
  // const storeData = storeDatas.find((s) => s.accountName === store)

  const parsedMarkdown = fm(contentData.content)
  const htmlString = marked(parsedMarkdown.body)
  return {
    props: {
      contentData,
      accuntData,
      htmlString,
      store,
      user,
    },
  }
}

export default function ContentDetail({
  contentData,
  accuntData,
  htmlString,
  store,
  user,
}: {
  contentData: CMSContents
  accuntData: Account
  htmlString: string
  store: string
  user: string
}) {
  const { title, thumbnail, publishedAt, staff } = contentData
  const staffData = {
    ...staff,
    accountName: accuntData.name,
    storeName: accuntData.store,
  }
  // console.log(staff)

  const windowDimensions = useWindowDimensions()
  return (
    <Layout>
      <article
        className='
          mt-36 m-auto
          md:mt-60 md:w-layoutMd
        '
      >
        <div
          className='
          grid gap-16
          md:grid-cols-[1fr_34rem] md:justify-between md:gap-12
        '
        >
          {/* main */}
          <div
            className='
              w-layoutMbDefault m-auto 
              md:w-full md:p-20 md:rounded-lg md:border-2 md:border-white md:border-opacity-60 md:border-solid md:bg-blackWeak
          '
          >
            <div
              className='
              mb-16 pb-16 border-b-2 border-white border-opacity-60
              md:mb-24 md:pb-24
              '
            >
              <Image
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
                alt={title}
                // className='
                //   w-[28rem] h-80 m-auto object-cover
                //   md:w-[32rem] md:h-[32rem]
                // '
                className='
                  w-full aspect-[1.618] m-auto object-cover rounded-md
                '
              />
              <h1
                //   className='
                //     w-layoutMbDefault m-auto mt-6 mb-8 text-s7 text-center
                //     md:w-full md:text-s8 md:mt-10 md:mb-12
                // '
                className='
                  w-layoutMbDefault m-auto mt-10 mb-8 text-s7
                  md:w-full md:text-s9 md:mt-12 md:mb-10
              '
              >
                {title}
              </h1>
              <div
                className='
                  m-auto
                '
              >
                <div className='flex flex-row justify-between items-center gap-24 m-auto'>
                  <div className='flex items-center gap-4'>
                    <Image
                      src={staff.icon.url}
                      width={staff.icon.width}
                      height={staff.icon.height}
                      alt={staff.name}
                      className='w-14 h-14 rounded-full object-cover'
                    />
                    <span className='text-s2'>{staff.name}</span>
                  </div>
                  <time className={`text-s1 ${chivo.className}`}>
                    {dayjs(publishedAt).format('YYYY.MM.DD')}
                  </time>
                </div>
              </div>
            </div>
            {/* attributes.contentを表示 */}
            <div
              className='prose prose-h2:px-8 prose-h2:py-6 prose-h2:rounded-3xl prose-h2:border-2 prose-h2:border-white prose-h2:border-opacity-60 prose-h2:border-solid prose-h2:bg-black prose-h2:text-white prose-h2:text-proseH2 prose-h3:text-proseH3 prose-h3:text-white prose-h3:border-b-2 prose-h3:border-white prose-h3:border-opacity-60 prose-h3:border-solid prose-h3:py-2 prose-h3:px-4 prose-h4:text-proseH4 prose-h4:text-white prose-h4:border-b-2 prose-h4:border-white prose-h4:border-opacity-60 prose-h4:border-solid prose-h4:py-2 prose-h4:px-4 prose-h5:text-proseH5 prose-h5:text-white prose-h5:border-b-2 prose-h5:border-white prose-h5:border-opacity-60 prose-h5:border-solid prose-h5:py-2 prose-h5:px-4 prose-h6:text-proseH6 prose-h6:text-white prose-h6:border-b-2 prose-h6:border-white prose-h6:border-opacity-60 prose-h6:border-solid prose-h6:py-2 prose-h6:px-4 prose-p:text-s5LhLgLt prose-li:text-s5LhLgLt prose-li:m-0 text-white max-w-none'
              dangerouslySetInnerHTML={{ __html: htmlString }}
            />
          </div>
          {/* side */}
          <div
            className='
              h-fit 
              md:sticky md:top-12 md:right-0
            '
          >
            {/* head */}
            <div className=''>
              {/* リンクをコピー */}
              <button className=''>リンクをコピー</button>
              {/* twitterでシェア */}
              <a href='' className=''>
                Twitterでシェア
              </a>
              {/* 投稿日 */}
              <time className='text-s2'>{dayjs(publishedAt).format('YYYY.MM.DD')}</time>
            </div>
            {/* staff */}
            <div
              className='
                border-b border-white border-opacity-60
                md:h-fit md:border md:rounded-md md:overflow-hidden
              '
            >
              <Staff staff={staffData} />
            </div>
            <div
              className='
              w-layoutMbDefault m-auto mt-10
              md:w-full md:mt-8'
            >
              <Button href={`/${accuntData.name}`}>店舗情報を見る</Button>
            </div>
            {/* tags */}
          </div>
        </div>
      </article>
    </Layout>
  )
}
