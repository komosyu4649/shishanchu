import { ACCOUNTS } from '@/constants/strapi'
import { Account, StrapiStaff } from '@/type/strapi'
import axios from 'axios'
import Image from 'next/image'

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
  // console.log(params)
  const { store, user } = params.params
  //   console.log(params.params)
  const accuntData = ACCOUNTS.find((account) => account.name === store)
  //   console.log(store, user, accuntData)
  // console.log(accuntData)
  const staff = await axios.get(`http://localhost:${store}/api/users/?populate=icon,sns,profile`, {
    headers: {
      Authorization: `Bearer ${accuntData?.jwt}`,
    },
  })
  // const test = await axios.get(`http://localhost:${store}/api/users/?populate=icon`, {
  //   headers: {
  //     Authorization: `Bearer ${accuntData?.jwt}`,
  //   },
  // })
  // console.log(test.data.find((data: any) => data.username === user))
  const staffData = staff.data.find((data: any) => data.username === user)
  return {
    props: {
      staffData,
      store,
      accuntData,
    },
  }
}

export default function StaffDetail({
  staffData,
  store,
  accuntData,
}: {
  staffData: StrapiStaff
  store: string
  accuntData: Account
}) {
  const currentDate = new Date()
  const elapsedYears = currentDate.getFullYear() - new Date(staffData.profile.career).getFullYear()
  const elapsedMonths =
    currentDate.getMonth() - new Date(staffData.profile.career).getMonth() + 12 * elapsedYears
  // elapsedMonthsを〇〇年〇〇ヶ月に変換
  const careerYear = Math.floor(elapsedMonths / 12)
  const careerMonth = elapsedMonths % 12

  return (
    <section className=''>
      {/* profile */}
      <div className=''>
        <div className='grid grid-cols-[auto_1fr] items-center gap-12'>
          <Image
            src={`http://localhost:${store}${staffData.icon.url}`}
            width={staffData.icon.width}
            height={staffData.icon.height}
            alt='test'
            className='w-60 h-60 rounded-full object-cover'
          />
          <div className='flex flex-col gap-4'>
            <span className='text-s7'>{staffData.username}</span>
            <span className='text-s6 opacity-60'>【{accuntData.store}】</span>
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
        <div className='flex flex-col gap-4 pl-8 mt-12 ml-72 border-l-2 border-solid border-green'>
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
      {/* contents */}
    </section>
  )
}
