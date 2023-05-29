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
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (params: any) => {
  const coupons = await axios.get(`http://localhost:3000/api/strapi/getAllCoupons`)

  const couponsData = coupons.data.map((coupon: StrapiCoupon) => ({
    ...coupon,
  }))
  const flattenedCoupons = couponsData.flat()
  const sortedCoupons = flattenedCoupons.sort(
    (a, b) =>
      new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime(),
  )

  return {
    props: {
      coupons: sortedCoupons,
    },
  }
}

export default function Coupon({ coupons }) {
  return <section className=''></section>
}
