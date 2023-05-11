import { ACCOUNTS } from '@/constants/strapi'
import { StrapiContent } from '@/type/strapi'
import axios from 'axios'
import Image from 'next/image'

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
  const contentsData = content.data.data
  return {
    props: {
      contentsData,
      store,
    },
  }
}

export default function ContentDetail({
  contentsData,
  store,
}: {
  contentsData: StrapiContent
  store: string
}) {
  return (
    <article className='mt-96'>
      <h1 className='text-xl text-center'>{contentsData.attributes.title}</h1>
      <div className='grid grid-cols-2'>
        {/* main */}
        <div className=''>
          <Image
            src={`http://localhost:${store}${contentsData.attributes.thumbnail.data.attributes.url}`}
            width={contentsData.attributes.thumbnail.data.attributes.width}
            height={contentsData.attributes.thumbnail.data.attributes.height}
            alt='test'
            className=''
          />
          {/* attributes.contentを表示 */}
          <div className='' dangerouslySetInnerHTML={{ __html: contentsData.attributes.content }} />
        </div>
        {/* side */}
        <div className=''>
          {/* head */}
          {/* staff */}
          <div className='flex items-center gap-4'>
            <Image
              src={`http://localhost:${store}${contentsData.attributes.users_permissions_user.data.attributes.icon.data.attributes.url}`}
              width={
                contentsData.attributes.users_permissions_user.data.attributes.icon.data.attributes
                  .width
              }
              height={
                contentsData.attributes.users_permissions_user.data.attributes.icon.data.attributes
                  .height
              }
              alt='test'
              className='w-16 h-16 rounded-full object-cover'
            />
            <span className='text-sm'>
              {contentsData.attributes.users_permissions_user.data.attributes.username}
            </span>
          </div>

          {/* tags */}
        </div>
      </div>
    </article>
  )
}
