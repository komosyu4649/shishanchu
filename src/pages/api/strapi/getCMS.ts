import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('http://localhost:1330/api/features?populate=thumbnail', {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_JWT_CMS}`,
      },
    })
    const responseData = response.data.data
    res.status(200).json(responseData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
