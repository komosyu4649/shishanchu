import { ACCOUNTS } from '@/constants/strapi'

export async function fetchStores(limit?: number): Promise {
  const accounts = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const response = await axios.get(`http://localhost:${account.name}/api/stores`, {
        headers: {
          Authorization: `Bearer ${account.jwt}`,
        },
      })
      const accountDataWithAccountName = response.data.map((store) => ({
        ...store,
        accountName: account.name,
        storeName: account.store,
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
