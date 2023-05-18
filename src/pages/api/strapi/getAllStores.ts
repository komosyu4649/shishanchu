import { NextApiRequest, NextApiResponse } from 'next'
import { fetchStores } from '@/lib/strapi/fetchStores'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const staffs = await fetchStores()
    res.status(200).json(staffs)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
