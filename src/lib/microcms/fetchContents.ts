import { ACCOUNTS } from '@/constants/microcms'
import { CMSContents } from '@/type/microcms'
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
      const contents = response.contents.map((content: CMSContents) => ({
        ...content,
        accountName: account.name,
        storeName: account.store,
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
