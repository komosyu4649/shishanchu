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
  const staff = await axios.get(`http://localhost:${store}/api/users/?populate=icon`, {
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
  // console.log(accuntData)
  // console.log(staffData)
  return (
    <section className=''>
      {/* profile */}
      <div className=''>
        <Image
          src={`http://localhost:${store}${staffData.icon.url}`}
          width={staffData.icon.width}
          height={staffData.icon.height}
          alt='test'
          className='w-60 h-60 rounded-full object-cover'
        />
        <div className=''>
          <span className='text-s7'>{staffData.username}</span>
          <span className='text-s6 opacity-60'>【{accuntData.store}】</span>
        </div>
      </div>
      {/* contents */}
    </section>
  )
}
