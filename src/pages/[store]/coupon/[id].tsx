import Layout from '@/components/layout/Layout'
import { ACCOUNTS } from '@/constants/strapi'
import { StrapiCoupon, StrapiStore } from '@/type/strapi'
import axios from 'axios'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
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

  const stores = await axios.get(
    `http://localhost:${store}/api/stores/1?populate=information.address`,
    {
      headers: {
        Authorization: `Bearer ${accuntData?.jwt}`,
      },
    },
  )

  const storeData = stores.data.data

  const storeName = accuntData?.store

  return {
    props: {
      couponData,
      storeData,
      storeName,
      store,
    },
  }
}

export default function CouponDetail({
  couponData,
  storeData,
  storeName,
  store,
}: {
  couponData: StrapiCoupon
  storeData: StrapiStore
  storeName: string
  store: string
}) {
  // console.log(couponData)

  return <Layout>test</Layout>
}
