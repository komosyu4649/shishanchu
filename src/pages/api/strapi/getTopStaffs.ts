import { NextApiRequest, NextApiResponse } from 'next'
import { fetchStaffs } from '@/lib/strapi/fetchStaffs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const staffs = await fetchStaffs(4)
    res.status(200).json(staffs)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
