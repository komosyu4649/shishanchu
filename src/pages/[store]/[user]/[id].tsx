import { StrapiContent } from '@/type/strapi'

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

export const getStaticProps = async (params) => {
  // console.log(params)
  // const { store, user, id } = params.params
  // console.log(store, user, id)
  // const res = await axios.get(
  //   `http://localhost:1337/strapi-contents?store=${store}&user=${user}&id=${id}`,
  // )
  // return {
  //   props: {
  //     data: res.data[0] || {},
  //   },
  // }
  // console.log(res)
  const contents = await fetch('http://localhost:3000/api/strapi/getAllContents')
  const contentsData: StrapiContent[] = await contents.json()
  return {
    props: {
      contentsData,
    },
  }
}

export default function ContentDetail({ contentsData }: { contentsData: StrapiContent[] }) {
  //   console.log(contentsData)
  return <div>ContentDetail</div>
}
