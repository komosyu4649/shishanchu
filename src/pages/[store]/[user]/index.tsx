import Content from '@/components/item/Content'
import { ACCOUNTS } from '@/constants/strapi'
import { Account, StrapiContent, StrapiStaff } from '@/type/strapi'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

export const getStaticPaths = async () => {
  const staffs = await fetch('http://localhost:3000/api/strapi/getAllStaffs')
  const staffsData: StrapiStaff[] = await staffs.json()
  //   console.log(staffsData[0].id)
  return {
    paths: staffsData.map((staff) => ({
      params: {
        store: staff.accountName,
        user: decodeURI(staff.username),
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
  const accuntData = ACCOUNTS.find((account) => account.name === store)
  const staff = await axios.get(`http://localhost:${store}/api/users/?populate=icon,sns,profile`, {
    headers: {
      Authorization: `Bearer ${accuntData?.jwt}`,
    },
  })
  const staffData = staff.data.find((data: any) => data.username === user)
  const contents = await axios.get(
    `http://localhost:${accuntData?.name}/api/contents?populate=users_permissions_user.icon,thumbnail`,
    {
      headers: {
        Authorization: `Bearer ${accuntData?.jwt}`,
      },
    },
  )

  // console.log(contents.data.data)
  // console.log(accuntData)
  const contentsData = contents.data.data.map((content: StrapiContent) => ({
    ...content,
    accountName: accuntData?.name,
    storeName: accuntData?.store,
    jwt: accuntData?.jwt,
  }))

  const flattenedAccounts = contentsData.flat()

  const sortedAccounts = flattenedAccounts.sort(
    (a, b) =>
      new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime(),
  )
  // console.log(1, sortedAccounts)
  // console.log(2, contentsData)
  return {
    props: {
      staffData,
      store,
      accuntData,
      sortedAccounts,
    },
  }
}

export default function StaffDetail({
  staffData,
  store,
  accuntData,
  sortedAccounts,
}: {
  staffData: StrapiStaff
  store: string
  accuntData: Account
  sortedAccounts: StrapiContent[]
}) {
  const currentDate = new Date()
  const elapsedYears = currentDate.getFullYear() - new Date(staffData.profile.career).getFullYear()
  const elapsedMonths =
    currentDate.getMonth() - new Date(staffData.profile.career).getMonth() + 12 * elapsedYears
  const careerYear = Math.floor(elapsedMonths / 12)
  const careerMonth = elapsedMonths % 12
  // console.log(contentsData)
  // console.log(sortedAccounts)

  return (
    <section className='w-layoutSm m-auto mt-96'>
      {/* profile */}
      <div className='grid grid-cols-[1fr_38.5rem] gap-12 border-b-2 border-solid border-white border-opacity-60 mb-32 pb-32'>
        {/* left */}
        <div className=''>
          {/* account */}
          <div className='grid grid-cols-[auto_1fr] items-center gap-12'>
            <Image
              src={`http://localhost:${store}${staffData.icon.url}`}
              width={staffData.icon.width}
              height={staffData.icon.height}
              alt='test'
              className='w-60 h-60 rounded-full object-cover'
            />
            <div className='flex flex-col gap-4'>
              <span className='text-s8'>{staffData.username}</span>
              <span className='text-s7 opacity-60'>【{accuntData.store}】</span>
            </div>
          </div>
          {/* sns */}
          <div className='flex flex-col gap-2 ml-72'>
            {staffData.sns.twitter && (
              <a href={staffData.sns.twitter} className='text-s3'>
                twitter
              </a>
            )}
            {staffData.sns.instagram && (
              <a href={staffData.sns.instagram} className='text-s3'>
                instagram
              </a>
            )}
            {staffData.sns.tiktok && (
              <a href={staffData.sns.tiktok} className='text-s3'>
                tiktok
              </a>
            )}
            {staffData.sns.other && (
              <a href={staffData.sns.other} className='text-s3'>
                その他
              </a>
            )}
          </div>
          {/* profile */}
          <div className='flex flex-col gap-4 py-2 pl-8 mt-12 ml-72 border-l-2 border-solid border-green'>
            <dl className='flex gap-2 text-s4'>
              <dt className=''>シーシャバー暦</dt> :{' '}
              <dd className=''>
                <span className=''>
                  {careerYear}年{careerMonth > 0 && `${careerMonth}ヶ月`}
                </span>
              </dd>
            </dl>
            <dl className='flex gap-2 text-s4'>
              <dt className=''>出身</dt> :{''} <dd className=''>{staffData.profile.birthplace}</dd>
            </dl>
          </div>
        </div>
        {/* right */}
        <div className=''>
          {/* buttons */}
          <div className=''>
            <Link
              href=''
              className='inline-flex justify-center items-center mt-12 px-20 py-8 text-white text-s4 rounded-full bg-green'
            >
              店舗情報を見る
            </Link>
          </div>
          {/* bio */}
          <div className='mt-16'>
            <p className='text-s5LhLgLt'>{staffData.biography}</p>
          </div>
        </div>
      </div>
      {/* contents */}
      <div className=''>
        <ul className='grid grid-cols-3 gap-4'>
          {sortedAccounts.map((content, index) => (
            <li key={index} className=''>
              <Content content={content} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
