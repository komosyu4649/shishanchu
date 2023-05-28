import axios from 'axios'
import { StrapiStaff } from '@/type/strapi'
import { ACCOUNTS } from '@/constants/strapi'

export async function fetchStaffs(limit?: number): Promise<StrapiStaff[]> {
  const accounts: StrapiStaff[] = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const response = await axios.get(
        `http://localhost:${account.name}/api/users?populate=icon,biography`,
        {
          headers: {
            Authorization: `Bearer ${account.jwt}`,
          },
        },
      )
      const accountDataWithAccountName = response.data.map((staff: StrapiStaff) => ({
        ...staff,
        accountName: account.name,
        storeName: account.store,
        jwt: account.jwt,
      }))

      return accountDataWithAccountName
    }),
  )

  const flattenedAccounts = accounts.flat()
  // console.log(flattenedAccounts)

  const sortedAccounts = flattenedAccounts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  //   console.log(sortedAccounts)

  if (limit) {
    return sortedAccounts.slice(0, limit)
  } else {
    return sortedAccounts
  }

  //   return sortedAccounts
}
