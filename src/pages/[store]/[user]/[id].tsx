import { ACCOUNTS } from '@/constants/strapi'
import { StrapiContent } from '@/type/strapi'
import axios from 'axios'
import dayjs from 'dayjs'
import fm from 'front-matter'
import { marked } from 'marked'
import Image from 'next/image'
import Link from 'next/link'

// [store]/[user]/[id].tsxのパスをgetStaticPathで作る
export const getStaticPaths = async () => {
  const contents = await fetch('http://localhost:3000/api/strapi/getAllContents')
  const contentsData: StrapiContent[] = await contents.json()
  return {
    paths: contentsData.map((content) => ({
      params: {
        store: content.accountName,
        user: decodeURI(content.attributes.users_permissions_user.data.attributes.username),
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
  // console.log(123, params)
  const { store, user, id } = params.params
  const accuntData = ACCOUNTS.find((account) => account.name === store)
  const content = await axios.get(
    `http://localhost:${store}/api/contents/${id}?populate=users_permissions_user.icon,thumbnail`,
    {
      headers: {
        Authorization: `Bearer ${accuntData?.jwt}`,
      },
    },
  )
  const parsedMarkdown = fm(content.data.data.attributes.content)
  // console.log(parsedMarkdown)
  const htmlString = marked(parsedMarkdown.body)
  const contentsData = content.data.data
  return {
    props: {
      contentsData,
      htmlString,
      store,
      user,
    },
  }
}

export default function ContentDetail({
  contentsData,
  htmlString,
  store,
  user,
}: {
  contentsData: StrapiContent
  htmlString: string
  store: string
  user: string
}) {
  // console.log(contentsData.attributes.users_permissions_user.data.attributes.biography)
  // console.log(store, user)
  return (
    <article className='mt-96 m-auto w-layoutMd'>
      <h1 className='text-s8 text-center mb-28'>{contentsData.attributes.title}</h1>
      <div className='grid grid-cols-[1fr_34rem] justify-between gap-16'>
        {/* main */}
        <div className='p-20 rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak'>
          <Image
            src={`http://localhost:${store}${contentsData.attributes.thumbnail.data.attributes.url}`}
            width={contentsData.attributes.thumbnail.data.attributes.width}
            height={contentsData.attributes.thumbnail.data.attributes.height}
            alt='test'
            className='w-full h-[42rem] mb-28 object-cover'
          />
          {/* attributes.contentを表示 */}
          <div
            className='prose prose-h2:px-8 prose-h2:py-6 prose-h2:rounded-3xl prose-h2:border-2 prose-h2:border-white prose-h2:border-opacity-60 prose-h2:border-solid prose-h2:bg-black prose-h2:text-white prose-h2:text-proseH2 prose-h3:text-proseH3 prose-h3:text-white prose-h3:border-b-2 prose-h3:border-white prose-h3:border-opacity-60 prose-h3:border-solid prose-h3:py-2 prose-h3:px-4 prose-h4:text-proseH4 prose-h4:text-white prose-h4:border-b-2 prose-h4:border-white prose-h4:border-opacity-60 prose-h4:border-solid prose-h4:py-2 prose-h4:px-4 prose-h5:text-proseH5 prose-h5:text-white prose-h5:border-b-2 prose-h5:border-white prose-h5:border-opacity-60 prose-h5:border-solid prose-h5:py-2 prose-h5:px-4 prose-h6:text-proseH6 prose-h6:text-white prose-h6:border-b-2 prose-h6:border-white prose-h6:border-opacity-60 prose-h6:border-solid prose-h6:py-2 prose-h6:px-4 prose-p:text-s5LhLgLt prose-li:text-s5LhLgLt prose-li:m-0 text-white max-w-none'
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
        </div>
        {/* side */}
        <div className='sticky top-12 right-0 h-fit'>
          {/* head */}
          <div className=''>
            {/* リンクをコピー */}
            <button className=''>リンクをコピー</button>
            {/* twitterでシェア */}
            <a href='' className=''>
              Twitterでシェア
            </a>
            {/* 投稿日 */}
            <time className='text-s2'>
              {dayjs(contentsData.attributes.publishedAt).format('YYYY.MM.DD')}
            </time>
          </div>
          {/* staff */}
          <div className='p-12 rounded-3xl border-2 border-white border-opacity-60 border-solid bg-blackWeak'>
            {/* name */}
            <div className='flex items-center gap-4'>
              <Image
                src={`http://localhost:${store}${contentsData.attributes.users_permissions_user.data.attributes.icon.data.attributes.url}`}
                width={
                  contentsData.attributes.users_permissions_user.data.attributes.icon.data
                    .attributes.width
                }
                height={
                  contentsData.attributes.users_permissions_user.data.attributes.icon.data
                    .attributes.height
                }
                alt='test'
                className='w-20 h-20 rounded-full object-cover'
              />
              <span className='flex flex-col gap-1'>
                <span className='text-s5'>
                  {contentsData.attributes.users_permissions_user.data.attributes.username}
                </span>
                {/* 店舗名 */}
                <span className='text-s2 opacity-60'>【{store}】</span>
              </span>
            </div>
            {/* biography */}
            <p className='mt-8 text-s3'>
              {contentsData.attributes.users_permissions_user.data.attributes.biography}
            </p>
            {/* link */}
            <div className='mt-8 flex justify-center'>
              <Link
                href={`/${store}/${user}`}
                className='inline-flex justify-center items-center px-16 py-6 text-green text-s4 rounded-full border-2 border-green border-solid'
              >
                スタッフを見る
              </Link>
            </div>
          </div>
          {/* store */}
          <Link
            href=''
            className='inline-flex justify-center items-center w-full mt-12 px-20 py-8 text-white text-s4 rounded-full bg-green'
          >
            店舗情報を見る
          </Link>
          {/* tags */}
        </div>
      </div>
    </article>
  )
}
