import Content from '@/components/item/Content'
import { StrapiContent } from '@/type/strapi'
import React from 'react'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllContents')
  const contents = await res.json()
  //   console.log(contents)
  return {
    props: {
      contents,
    },
  }
}

export default function Contents({ contents }: { contents: StrapiContent[] }) {
  return (
    <section className='w-layoutSm m-auto'>
      <h1>
        <span>スタッフ投稿</span>
        <span>【{contents.length}】</span>
      </h1>
      <div className=''>
        <ul className='grid grid-cols-3 gap-4'>
          {contents.map((content) => (
            <li key={content.id}>
              <Content content={content} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
