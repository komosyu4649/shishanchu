import { NextApiRequest, NextApiResponse } from 'next'
import { fetchCoupons } from '@/lib/strapi/fetchCoupons'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const coupons = await fetchCoupons()
    res.status(200).json(coupons)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
