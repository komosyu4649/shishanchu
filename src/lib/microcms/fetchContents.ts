import { ACCOUNTS } from '@/constants/microcms'
import axios from 'axios'
import { createClient } from 'microcms-js-sdk'

export const fetchContents = async (limit?: number) => {
  const contentsData = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const res = createClient({
        serviceDomain: account.name,
        apiKey: account.key,
      }).get({
        endpoint: 'contents',
      })
      const response = await res
      const contents = response.contents.map((content, index) => ({
        ...content,
      }))
      return contents
    }),
  )
  const flattenedContents = contentsData.flat()

  const sortedAccounts = flattenedContents.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  if (limit) {
    return sortedAccounts.slice(0, limit)
  } else {
    return sortedAccounts
  }
}

// export async function fetchContents(limit?: number) {
//   // ACCOUNTSの分をmicrocmsのcreateClientで取得する
//   const accounts = await Promise.all(
//     ACCOUNTS.map(async (account) => {
//       const response = await axios.get(
//         `https://${account.name}.microcms.io/api/v1/features?limit=${limit}&offset=0`,
//         {
//           headers: {
//             'X-API-KEY': account.key,
//           },
//         },
//       )
//       const accountDataWithAccountName = response.data.contents.map((content: any) => ({
//         ...content,
//         accountName: account.name,
//         apiKey: account.key,
//       }))
//       return accountDataWithAccountName
//     }),
//   )
// }
