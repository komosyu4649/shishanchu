import Content from '@/components/item/Content'
import Layout from '@/components/layout/Layout'
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
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative w-layoutSm flex items-end gap-6 m-auto mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>スタッフ投稿</span>
          <span className='text-s7'>【{contents.length}】</span>
        </h1>
        <div className=''>
          <ul className='grid grid-cols-4 gap-4'>
            {contents.map((content) => (
              <li key={content.id}>
                <Content content={content} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
