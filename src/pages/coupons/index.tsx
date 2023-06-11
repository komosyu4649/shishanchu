import { StrapiCoupon } from '@/type/strapi'
import React, { useState } from 'react'
import Coupon from '@/components/item/Coupon'
import Layout from '@/components/layout/Layout'
import { DEADLINES } from '@/constants/strapi'
import Button from '@/components/common/Button'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

type Query = {
  deadline?: string | null
}

export const getServerSideProps: GetServerSideProps<{ coupons: StrapiCoupon[] }> = async ({
  query,
}: {
  query: Query
}) => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllCoupons')
  let coupons = await res.json()

  console.log(coupons)
  // if (query.deadline) {
  //   const deadlineMonth = Number(query.deadline)
  //   const currentMonth = new Date().getMonth()
  //   if (deadlineMonth >= 0 && deadlineMonth < 1) {
  //     coupons = coupons.filter(
  //       (coupon) =>
  //         currentMonth - new Date(coupon.deadline).getMonth() >= 0 &&
  //         currentMonth - new Date(coupon.deadline).getMonth() < 1,
  //     )
  //   } else {
  //     coupons = coupons.filter(
  //       (coupon) => currentMonth - new Date(coupon.deadline).getMonth() >= deadlineMonth,
  //     )
  //   }
  // }

  return {
    props: {
      coupons,
    },
  }
}

export default function Coupons({ coupons }: { coupons: StrapiCoupon[] }) {
  const router = useRouter()

  const [searchParams, setSearchParams] = useState({
    deadline: 0,
  })

  const handleSelectCareer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearchQuery = () => {
    router.push({
      pathname: router.pathname,
      query: {
        deadline: searchParams.deadline,
      },
    })
  }

  return (
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative flex items-end gap-6 mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>クーポン一覧</span>
          <span className='text-s7'>【{coupons.length}】</span>
        </h1>
        <div className='grid grid-cols-[20rem_1fr] content-between gap-24'>
          {/* side */}
          <div className='flex flex-col gap-20'>
            {/* deadline */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>期限</span>
              <div className='mt-6'>
                <select
                  name='deadline'
                  id='deadline'
                  onChange={handleSelectCareer}
                  className='w-full px-4 py-4 rounded-lg text-black text-s3 appearance-none'
                  value={searchParams.deadline}
                >
                  <option value=''>いつまで使える？</option>
                  {DEADLINES.map((deadline, index) => (
                    <option key={index} value={deadline.month}>
                      {deadline.month}ヶ月以内
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* area */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>エリア</span>
              <div className='mt-8'>
                <select name='area' id='area' className='w-full px-6 py-4 text-black text-s3'>
                  <option value=''>エリアを選択する</option>
                  <option value='tokyo'>東京</option>
                  <option value='chiba'>千葉</option>
                </select>
              </div>
            </div>
            {/* privilege */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>
                特典内容
              </span>
              <div className='mt-8'>
                <select name='area' id='area' className='w-full px-6 py-4 text-black text-s3'>
                  <option value=''>どんな特典があるの？</option>
                  <option value='tokyo'>他券・サービス併用不可</option>
                  <option value='chiba'>要予約</option>
                </select>
              </div>
            </div>
            {/* facility */}
            {/* <div className=''>
            <ul className=''>
              <li className=''></li>
            </ul>
          </div> */}
            <Button onClick={handleSearchQuery} className='bg-green'>
              検索する
            </Button>
          </div>
          {/* main */}
          <div className='w-layoutSm'>
            <ul className='grid grid-cols-3 gap-4'>
              {coupons.map((coupon, index) => (
                <li key={index} className=''>
                  <Coupon coupon={coupon} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}
