import { NextApiRequest, NextApiResponse } from 'next'
import { fetchContents } from '@/lib/strapi/fetchContents'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const contents = await fetchContents()
    res.status(200).json(contents)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
