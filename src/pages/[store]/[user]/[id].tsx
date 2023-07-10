import Button from '@/components/common/Button'
import Staff from '@/components/item/Staff'
import Layout from '@/components/layout/Layout'
import { BREAKPOINT } from '@/constants/common'
import { ACCOUNTS } from '@/constants/strapi'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'
import { fetchCommonData } from '@/lib/microcms/fetchCommonData'
import { fetchCommonJsonDatas } from '@/lib/microcms/fetchCommonJsonDatas'
import { fetchCommonListDatas } from '@/lib/microcms/fetchCommonListDatas'
import { chivo } from '@/pages/_app'
import { CMSContents } from '@/type/microcms'
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
  // const storeDatas = await fetchCommonJsonDatas('store')
  // const storeData = storeDatas.find((s) => s.accountName === store)

  const parsedMarkdown = fm(contentData.content)
  const htmlString = marked(parsedMarkdown.body)
  return {
    props: {
      contentData,
      htmlString,
      store,
      user,
    },
  }
}

export default function ContentDetail({
  contentData,
  htmlString,
  store,
  user,
}: {
  contentData: CMSContents
  htmlString: string
  store: string
  user: string
}) {
  const { title, thumbnail, publishedAt, staff } = contentData
  console.log(store)

  const windowDimensions = useWindowDimensions()
  return (
    <Layout>
      <article className='mt-48 md:mt-36 m-auto md:w-layoutMd'>
        {/* {windowDimensions.width < BREAKPOINT && (
          <Image
            src={thumbnail.url}
            width={thumbnail.width}
            height={thumbnail.height}
            alt={title}
            className='w-[32rem] h-96 m-auto mb-8 md:mb-28 object-cover'
          />
        )} */}
        {/* {windowDimensions.width > BREAKPOINT && ( */}
        <h1 className='w-layoutMbDefault m-auto mb-10 text-s7 text-center md:text-s10 md:mb-24'>
          {title}
        </h1>
        {/* )} */}
        {/* <div className='flex flex-row justify-between items-center w-[32rem] m-auto'>
          <div className='flex items-center gap-4'>
            <Image
              src={staff.icon.url}
              width={staff.icon.width}
              height={staff.icon.height}
              alt='test'
              className='w-16 h-16 rounded-full object-cover'
            />
            <span className='text-s3'>{staff.name}</span>
          </div>
          <time className={`text-s1 ${chivo.className}`}>
            {dayjs(publishedAt).format('YYYY.MM.DD')}
          </time>
        </div> */}

        <div className='grid md:grid-cols-[1fr_34rem] md:justify-between gap-16'>
          {/* main */}
          <div className='w-layoutMbDefault m-auto md:p-20 md:rounded-3xl md:border-2 md:border-white md:border-opacity-60 md:border-solid md:bg-blackWeak'>
            <Image
              src={thumbnail.url}
              width={thumbnail.width}
              height={thumbnail.height}
              alt={title}
              // className='w-[32rem] h-80 m-auto md:h-[42rem] md:mb-28 object-cover'
              className='w-full h-80 m-auto md:h-[42rem] md:mb-28 object-cover'
            />
            {/* {windowDimensions.width < BREAKPOINT && (
              <h1 className='w-layoutMbDefault m-auto text-s7 text-center mt-6 mb-8'>{title}</h1>
            )} */}
            {windowDimensions.width < BREAKPOINT && (
              // <div className='flex flex-row justify-between items-end gap-4 m-auto mb-20 px-8 pb-16 border-b border-white'>
              <div className='flex flex-row justify-between items-center gap-24 m-auto mt-6 mb-20 pb-16 border-b border-white'>
                <div className='flex items-center gap-4'>
                  <Image
                    src={staff.icon.url}
                    width={staff.icon.width}
                    height={staff.icon.height}
                    alt='test'
                    className='w-14 h-14 rounded-full object-cover'
                  />
                  <span className='text-s2'>{staff.name}</span>
                </div>
                <time className={`text-s1 ${chivo.className}`}>
                  {dayjs(publishedAt).format('YYYY.MM.DD')}
                </time>
              </div>
            )}
            {/* attributes.contentを表示 */}
            <div
              className='prose prose-h2:px-8 prose-h2:py-6 prose-h2:rounded-3xl prose-h2:border-2 prose-h2:border-white prose-h2:border-opacity-60 prose-h2:border-solid prose-h2:bg-black prose-h2:text-white prose-h2:text-proseH2 prose-h3:text-proseH3 prose-h3:text-white prose-h3:border-b-2 prose-h3:border-white prose-h3:border-opacity-60 prose-h3:border-solid prose-h3:py-2 prose-h3:px-4 prose-h4:text-proseH4 prose-h4:text-white prose-h4:border-b-2 prose-h4:border-white prose-h4:border-opacity-60 prose-h4:border-solid prose-h4:py-2 prose-h4:px-4 prose-h5:text-proseH5 prose-h5:text-white prose-h5:border-b-2 prose-h5:border-white prose-h5:border-opacity-60 prose-h5:border-solid prose-h5:py-2 prose-h5:px-4 prose-h6:text-proseH6 prose-h6:text-white prose-h6:border-b-2 prose-h6:border-white prose-h6:border-opacity-60 prose-h6:border-solid prose-h6:py-2 prose-h6:px-4 prose-p:text-s5LhLgLt prose-li:text-s5LhLgLt prose-li:m-0 text-white max-w-none'
              dangerouslySetInnerHTML={{ __html: htmlString }}
            />
          </div>
          {/* side */}
          <div className='md:sticky md:top-12 md:right-0 h-fit'>
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
            <div className='border-t border-white border-opacity-60'>
              <Staff staff={staff} />
            </div>
            {/* <div className='p-12 rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak'>
              name
              <div className='flex items-center gap-4'>
                <Image
                  src={staff.icon.url}
                  width={staff.icon.width}
                  height={staff.icon.height}
                  alt='test'
                  className='w-20 h-20 rounded-full object-cover'
                />
                <span className='flex flex-col gap-1'>
                  <span className='text-s5'>{staff.name}</span>
                  店舗名
                  <span className='text-s2 opacity-60'>【{store}】</span>
                </span>
              </div>
              biography
              <p className='mt-8 text-s3'>{staff.biography}</p>
              link
              <div className='mt-8 flex justify-center'>
                <Link
                  href={`/${store}/${user}`}
                  className='inline-flex justify-center items-center px-16 py-6 text-green text-s4 rounded-full border-2 border-green border-solid'
                >
                  スタッフを見る
                </Link>
              </div>
            </div> */}
            {/* store */}
            {/* <Link
              href=''
              className='inline-flex justify-center items-center w-full mt-12 px-20 py-8 text-white text-s4 rounded-md bg-green'
            >
              店舗情報を見る
            </Link> */}
            <div className='w-layoutMbDefault m-auto mt-10'>
              <Button href={`/${store}`}>店舗情報を見る</Button>
            </div>
            {/* tags */}
          </div>
        </div>
      </article>
    </Layout>
  )
}
