import Image from 'next/image'
import { Inter } from 'next/font/google'
import { StrapiContent } from '../type/strapi'

const inter = Inter({ subsets: ['latin'] })

// /api/strapi/index.tsで作成したapiをgetStaticPropsで取得
export const getStaticProps = async () => {
  const contents = await fetch('http://localhost:3000/api/strapi/getTopContents')
  const contentsData = await contents.json()
  return {
    props: {
      contentsData,
    },
  }
}

export default function Home({ contentsData }: { contentsData: StrapiContent[] }) {
  // console.log(1, contentsData)
  return (
    <main>
      {/* contents */}
      <section className=''>
        <h2 className=''>
          <span className=''>Contents</span>
          <span className=''>最新のスタッフ投稿</span>
        </h2>
        <div className=''>
          <ul className=''>
            {contentsData.map(
              (content, index) => (
                console.log(content.attributes.thumbnail.data),
                (
                  <li key={index} className=''>
                    {/* staff */}
                    <div className=''>
                      <Image
                        src={`http:localhost:${content.accountName}${content.attributes.users_permissions_user.data.attributes.icon.data.attributes.url}`}
                        width={
                          content.attributes.users_permissions_user.data.attributes.icon.data
                            .attributes.width
                        }
                        height={
                          content.attributes.users_permissions_user.data.attributes.icon.data
                            .attributes.height
                        }
                        alt='test'
                      />
                      <span className=''>
                        {content.attributes.users_permissions_user.data.attributes.username}
                      </span>
                    </div>
                    {/* main */}
                    <div className=''>
                      <Image
                        src={`http:localhost:${content.accountName}${content.attributes.thumbnail.data.attributes.url}`}
                        width={content.attributes.thumbnail.data.attributes.width}
                        height={content.attributes.thumbnail.data.attributes.height}
                        alt='test'
                      />
                      <p className=''>{content.attributes.title}</p>
                    </div>
                    {/* sub */}
                    <div className=''>
                      {/* store */}
                      <div className=''>
                        {/* <Image
                      src={`http:localhost:${content.accountName}${content.attributes.}`}
                    /> */}
                      </div>
                    </div>
                  </li>
                )
              ),
            )}
          </ul>
        </div>
      </section>
    </main>
  )
}
