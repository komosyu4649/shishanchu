import { ACCOUNTS } from '@/constants/microcms'
import { createClient } from 'microcms-js-sdk'

export const fetchCommonJsonDatas = async (endpoint: string, limit?: number) => {
  const datas = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const res = createClient({
        serviceDomain: account.name,
        apiKey: account.key,
      }).get({
        endpoint: endpoint,
      })
      const response = await res
      const responseData = Array.isArray(response) ? response : [response]

      return responseData.map((content) => ({
        ...content,
        accountName: account.name,
        storeName: account.store,
      }))
    }),
  )
  const flattenedDataContents = datas.flat()

  const sortedAccounts = flattenedDataContents.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  if (limit) {
    return sortedAccounts.slice(0, limit)
  } else {
    return sortedAccounts
  }
}
