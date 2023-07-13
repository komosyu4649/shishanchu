import Button from '@/components/common/Button'
import Content from '@/components/item/Content'
import ContentSm from '@/components/item/ContentSm'
import Layout from '@/components/layout/Layout'
import { BREAKPOINT } from '@/constants/common'
import { ACCOUNTS } from '@/constants/microcms'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'
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

  const windowDimensions = useWindowDimensions()

  return (
    <Layout>
      <section
        className='
          w-layoutMbDefault m-auto mt-36
          md:w-layoutSm md:mt-60
        '
      >
        {/* profile */}
        <div
          className='
            mb-16
            md:mb-28 md:pb-28 md:border-b-2 md:border-white md:border-opacity-60
          '
        >
          <div
            // className='
            //   grid gap-10 mb-16 items-end
            //   md:grid-cols-[1fr_42rem] md:gap-20 md:mb-28 md:pb-28 md:border-b-2 md:border-white md:border-opacity-60
            // '
            className='
              grid gap-10 items-end
              md:gap-8 md:w-[80rem] md:m-auto
            '
          >
            {/* left */}
            <div className='md:grid md:grid-cols-2 md:items-center md:gap-12'>
              {/* account */}
              <div
                className='
                grid grid-cols-[auto_1fr] items-center gap-8 
                md:gap-12
              '
              >
                <Image
                  src={icon.url}
                  width={icon.width}
                  height={icon.height}
                  alt={name}
                  className='
                  w-40 h-40 rounded-full object-cover
                  md:w-60 md:h-60
                '
                />
                <div className='flex flex-col gap-4'>
                  <span
                    className='
                    text-s7 break-all
                    md:text-s8
                  '
                  >
                    {name}
                  </span>
                  <span
                    className='
                    text-s3 opacity-60 break-all
                    md:text-s4
                   '
                  >
                    【{storeName}】
                  </span>
                </div>
              </div>
              <div
                // className='
                //   grid grid-cols-[auto_1fr] justify-between gap-10 mt-8
                //   md:gap-16 md:items-center md:mt-14
                // '
                className='
                  grid grid-cols-[auto_auto] justify-start gap-8 mt-8
                  md:gap-10 md:justify-end md:items-center md:mt-0
                '
              >
                {/* sns */}
                {sns && (
                  <div
                    className='
                    flex flex-row items-center gap-4 text-s3
                    md:gap-6 
                  '
                  >
                    {sns.twitter && (
                      <a href={sns.twitter} className=''>
                        <Image
                          src='/asset/img/snsTwitter.svg'
                          width={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          height={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          alt='twitter'
                        />
                      </a>
                    )}
                    {sns.instagram && (
                      <a href={sns.instagram} className=''>
                        <Image
                          src='/asset/img/snsInstagram.svg'
                          width={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          height={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          alt='instagram'
                        />
                      </a>
                    )}
                    {sns.tiktok && (
                      <a href={sns.tiktok} className=''>
                        <Image
                          src='/asset/img/snsTiktok.svg'
                          width={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          height={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          alt='tiktok'
                        />
                      </a>
                    )}
                    {sns.website && (
                      <a href={sns.website} className=''>
                        <Image
                          src='/asset/img/iconSite.svg'
                          width={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          height={windowDimensions.width > BREAKPOINT ? 26 : 18}
                          alt='Webサイト'
                        />
                      </a>
                    )}
                  </div>
                )}
                {/* profile */}
                <div
                  className='
                  flex flex-col gap-3 py-2 pl-8 border-l-2 border-solid border-green
                  md:gap-3 md:mt-0 md:py-3 md:pl-8
                '
                >
                  <dl
                    className='
                    flex gap-2 text-s2 
                    md:text-s3
                  '
                  >
                    <dt className=''>シーシャバー暦</dt> :{' '}
                    <dd className=''>
                      <span className=''>
                        {careerYear}年{careerMonth > 0 && `${careerMonth}ヶ月`}
                      </span>
                    </dd>
                  </dl>
                  <dl
                    className='
                    flex gap-2 text-s2 
                    md:text-s3
                  '
                  >
                    <dt className=''>出身</dt> : <dd className=''>{profile.birthplace}</dd>
                  </dl>
                </div>
              </div>
            </div>
            {/* right */}
            <div
              className='
              flex flex-col gap-10
              md:gap-12
              '
            >
              {/* buttons */}
              <div className='flex justify-end order-2'>
                <Button href={`${store}`}>店舗情報を見る</Button>
              </div>
              {/* bio */}
              <div
                className='
                order-1
              '
              >
                <p
                  className='
                  text-s3Lt whitespace-break-spaces
                  md:text-s5LhLgLt
                '
                >
                  {biography}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* contents */}
        <div className=''>
          <ul
            className='
              grid grid-cols-2 gap-4
              md:grid-cols-3 md:w-[80rem] md:m-auto
            '
          >
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
