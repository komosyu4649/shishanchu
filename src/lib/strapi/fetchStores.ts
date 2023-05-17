import { ACCOUNTS } from '@/constants/strapi'
import { StrapiStore } from '@/type/strapi'
import axios from 'axios'

export async function fetchStores(limit?: number): Promise<StrapiStore[]> {
  const accounts = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const response = await axios.get(
        `http://localhost:${account.name}/api/stores?populate=icon,sns,information,garelly`,
        {
          headers: {
            Authorization: `Bearer ${account.jwt}`,
          },
        },
      )

      const accountDataWithAccountName = response.data.data.map((store: StrapiStore) => ({
        ...store,
        accountName: account.name,
        storeName: account.store,
        region: account.region,
        jwt: account.jwt,
      }))
      return accountDataWithAccountName
    }),
  )

  const flattenedAccounts = accounts.flat()
  const sortedAccounts = flattenedAccounts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  if (limit) {
    return sortedAccounts.slice(0, limit)
  } else {
    return sortedAccounts
  }
}
