import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { StrapiContent } from '@/type/strapi'

const ACCOUNTS = [
  {
    name: '1337',
    store: '1496',
    jwt: process.env.STRAPI_JWT_STORETEMPLATE,
  },
  {
    name: '1338',
    store: 'c.stand 渋谷',
    jwt: process.env.STRAPI_JWT_STORETEMPLATE2,
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ACCOUNTS分のサーバーAPIを1つの配列にまとめるAuthorization認証を加える

  try {
    const accounts: StrapiContent[] = await Promise.all(
      ACCOUNTS.map(async (account) => {
        const response = await axios.get(
          //   `http://localhost:${account.name}/api/contents?populate=*`,
          `http://localhost:${account.name}/api/contents?populate=users_permissions_user.icon,thumbnail`,
          {
            headers: {
              Authorization: `Bearer ${account.jwt}`,
            },
          },
        )
        // return response.data.data
        // accountName を含める
        const accountDataWithAccountName = response.data.data.map((content: StrapiContent) => ({
          ...content,
          accountName: account.name,
          storeName: account.store,
        }))

        return accountDataWithAccountName
      }),
    )

    // 配列をフラット化する
    const flattenedAccounts = accounts.flat()

    // createdAtが最新になるように並び替え
    const sortedAccounts = flattenedAccounts.sort(
      (a, b) =>
        new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime(),
    )

    // 最新の4件だけに絞る
    const latestFourAccounts = sortedAccounts.slice(0, 4)

    res.status(200).json(latestFourAccounts)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
