import Button from '@/components/common/Button'
import Content from '@/components/item/Content'
import ContentSm from '@/components/item/ContentSm'
import Layout from '@/components/layout/Layout'
import { ACCOUNTS } from '@/constants/microcms'
import { fetchCommonData } from '@/lib/microcms/fetchCommonData'
import { fetchCommonListDatas } from '@/lib/microcms/fetchCommonListDatas'
import { CMSContents, CMSStaff } from '@/type/microcms'
import { Account, StrapiContent, StrapiStaff } from '@/type/strapi'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

export const getStaticPaths = async () => {
  const staffsData = await fetchCommonListDatas('staffs')

  return {
    paths: staffsData.map((staff) => ({
      params: {
        store: staff.accountName,
        user: decodeURI(staff.name),
      },
    })),
    fallback: false,
  }
}

type Params = {
  params: {
    store: string
    user: string
  }
}

export const getStaticProps = async (params: Params) => {
  const { store, user } = params.params
  const staffsData = await fetchCommonListDatas('staffs')
  const staffData = staffsData.find((staff) => staff.name === user)
  const contentsData = await fetchCommonListDatas('contents')
  const contentData = contentsData.filter((content) => content.staff.name === user)

  const flattenedAccounts = contentData.flat()

  const sortedAccounts = flattenedAccounts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return {
    props: {
      store,
      staffData,
      sortedAccounts,
    },
  }
}

export default function StaffDetail({
  store,
  staffData,
  sortedAccounts,
}: {
  store: string
  staffData: CMSStaff
  sortedAccounts: CMSContents[]
}) {
  const { icon, name, profile, sns, biography, storeName } = staffData
  const currentDate = new Date()
  const elapsedYears = currentDate.getFullYear() - new Date(profile.career).getFullYear()
  const elapsedMonths =
    currentDate.getMonth() - new Date(profile.career).getMonth() + 12 * elapsedYears
  const careerYear = Math.floor(elapsedMonths / 12)
  const careerMonth = elapsedMonths % 12

  return (
    <Layout>
      <section className='w-layoutMbDefault md:w-layoutSm m-auto mt-36'>
        {/* profile */}
        <div className='grid md:grid-cols-[1fr_38.5rem] gap-10 md:border-b-2 md:border-white md:border-opacity-60 mb-16 md:mb-32 md:pb-32'>
          {/* left */}
          <div className=''>
            {/* account */}
            <div className='grid grid-cols-[auto_1fr] items-center gap-8 md:gap-12'>
              <Image
                src={icon.url}
                width={icon.width}
                height={icon.height}
                alt={name}
                className='w-40 h-40 md:w-60 md:h-60 rounded-full object-cover'
              />
              <div className='flex flex-col gap-4'>
                <span className='text-s7 md:text-s8'>{name}</span>
                <span className='text-s3 md:text-s7 opacity-60'>【{storeName}】</span>
              </div>
            </div>
            <div className='grid grid-cols-[auto_1fr] justify-between mt-8'>
              {/* sns */}
              {sns && (
                <div className='flex flex-col gap-2 px-12 md:ml-72'>
                  {sns.twitter && (
                    <a href={sns.twitter} className='text-s3'>
                      twitter
                    </a>
                  )}
                  {sns.instagram && (
                    <a href={sns.instagram} className='text-s3'>
                      instagram
                    </a>
                  )}
                  {sns.tiktok && (
                    <a href={sns.tiktok} className='text-s3'>
                      tiktok
                    </a>
                  )}
                  {sns.website && (
                    <a href={sns.website} className='text-s3'>
                      Webサイト
                    </a>
                  )}
                </div>
              )}
              {/* profile */}
              <div className='flex flex-col gap-3 md:gap-4 py-2 pl-8 md:mt-12 md:ml-72 border-l-2 border-solid border-green'>
                <dl className='flex gap-2 text-s2 md:text-s4'>
                  <dt className=''>シーシャバー暦</dt> :{' '}
                  <dd className=''>
                    <span className=''>
                      {careerYear}年{careerMonth > 0 && `${careerMonth}ヶ月`}
                    </span>
                  </dd>
                </dl>
                <dl className='flex gap-2 text-s2 md:text-s4'>
                  <dt className=''>出身</dt> : <dd className=''>{profile.birthplace}</dd>
                </dl>
              </div>
            </div>
          </div>
          {/* right */}
          <div className='flex flex-col gap-10'>
            {/* buttons */}
            <div className='flex justify-end order-2'>
              {/* <Link
                href=''
                className='inline-flex justify-center items-center mt-12 px-20 py-8 text-white text-s4 rounded-full bg-green'
              >
                店舗情報を見る
              </Link> */}
              <Button href={`${store}`}>店舗情報を見る</Button>
            </div>
            {/* bio */}
            <div className='md:mt-16 order-1'>
              <p className='text-s4Lt md:text-s5LhLgLt whitespace-break-spaces'>{biography}</p>
            </div>
          </div>
        </div>
        {/* contents */}
        <div className=''>
          <ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {sortedAccounts.map((content, index) => (
              <li key={index} className=''>
                <ContentSm content={content} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
