// /cmsのstrapiからapiを取得する

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const contentsData = await (await axios.get('http://localhost:1337/api/contents')).data.data
    res.status(200).json(contentsData)
}
