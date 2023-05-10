import { ACCOUNTS } from '@/constants/strapi'
import { StrapiContent } from '@/type/strapi'
import axios from 'axios'

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
  console.log(123, params)
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
    },
  }
}

export default function ContentDetail({ contentsData }: { contentsData: StrapiContent }) {
  console.log(contentsData)
  return (
    <article>
      <h1 className=''>{contentsData.attributes.title}</h1>
    </article>
  )
}
