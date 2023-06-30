import { ACCOUNTS } from '@/constants/microcms'
import { CMSContents } from '@/type/microcms'
import { createClient } from 'microcms-js-sdk'

export const fetchCommonListDatas = async (endpoint: string, limit?: number) => {
  const datas = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const res = createClient({
        serviceDomain: account.name,
        apiKey: account.key,
      }).get({
        endpoint: endpoint,
      })
      const response = await res
      const dataContents = response.contents.map((content: CMSContents) => ({
        ...content,
        accountName: account.name,
        storeName: account.store,
      }))
      return dataContents
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
