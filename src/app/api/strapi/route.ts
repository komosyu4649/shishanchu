import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

const ACCOUNTS = [
  {
    name: '1337',
    jwt: process.env.STRAPI_JWT_STORETEMPLATE,
  },
  {
    name: '1338',
    jwt: process.env.STRAPI_JWT_STORETEMPLATE2,
  },
]

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //   return new NextResponse('Hello, Next.js!')
  //   return new Response('test')

  //
  //   try {
  // const accounts = await Promise.all(
  //   ACCOUNTS.map(async (account) => {
  //     const response = await fetch(`http://localhost:${account.name}/api/contents?populate=*`, {
  //       headers: {
  //         Authorization: `Bearer ${account.jwt}`,
  //       },
  //     })
  //     const test = await response.json()
  //     return NextResponse.json({ test })
  //   }),
  // )
  // res.status(200).json(accounts)
  //     // 配列をフラット化する
  //     const flattenedAccounts = accounts.flat()
  //     // createdAtが最新になるように並び替え
  //     const sortedAccounts = flattenedAccounts.sort(
  //       (a, b) =>
  //         new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime(),
  //     )
  //     res.status(200).json(sortedAccounts)
  //   console.log(accounts)
  const accounts = await Promise.all(
    ACCOUNTS.map(async (account) => {
      await fetch(`http://localhost:${account.name}/api/contents?populate=*`, {
        headers: {
          Authorization: `Bearer ${account.jwt}`,
        },
      })
    }),
  )

  const data = await accounts.json()
  return NextResponse.json({ data })
  //   } catch (err: any) {
  //     res.status(500).json({ statusCode: 500, message: err.message })
  //   }
}
