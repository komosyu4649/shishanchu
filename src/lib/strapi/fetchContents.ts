import axios from 'axios'
import { StrapiContent } from '@/type/strapi'
import { ACCOUNTS } from '@/constants/strapi'

export async function fetchContents(limit?: number): Promise<StrapiContent[]> {
  const accounts: StrapiContent[] = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const response = await axios.get(
        `http://localhost:${account.name}/api/contents?populate=users_permissions_user.icon,thumbnail`,
        {
          headers: {
            Authorization: `Bearer ${account.jwt}`,
          },
        },
      )

      //   return response.data.data
      const accountDataWithAccountName = response.data.data.map((content: StrapiContent) => ({
        ...content,
        accountName: account.name,
        storeName: account.store,
        jwt: account.jwt,
      }))
      return accountDataWithAccountName
    }),
  )

  const flattenedAccounts = accounts.flat()

  const sortedAccounts = flattenedAccounts.sort(
    (a, b) =>
      new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime(),
  )
  // console.log(sortedAccounts)

  if (limit) {
    return sortedAccounts.slice(0, limit)
  } else {
    return sortedAccounts
  }

  //   return sortedAccounts
}
