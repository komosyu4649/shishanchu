import { ACCOUNTS } from '@/constants/strapi'
import { StrapiCoupon } from '@/type/strapi'
import axios from 'axios'
import React from 'react'

export const getStaticPaths = async () => {
  const coupons = await fetch('http://localhost:3000/api/strapi/getAllCoupons')
  const couponsData: StrapiCoupon[] = await coupons.json()
  return {
    paths: couponsData.map((coupon) => ({
      params: {
        store: coupon.accountName,
        id: coupon.id.toString(),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (params: any) => {
  const { store, id } = params.params
  const accuntData = ACCOUNTS.find((account) => account.name === store)
  const coupon = await axios.get(`http://localhost:${store}/api/coupons/${id}`, {
    headers: {
      Authorization: `Bearer ${accuntData?.jwt}`,
    },
  })
  const couponData = coupon.data.data

  return {
    props: {
      couponData: couponData,
    },
  }
}

export default function CouponDetail({ couponData }) {
  return (
    <section className=''>
      <p className=''>スタッフにこちらの画面を提示してください</p>
      <div className=''>
        <h1 className=''>{couponData.attributes.title}</h1>
        <div className=''></div>
      </div>
    </section>
  )
}
