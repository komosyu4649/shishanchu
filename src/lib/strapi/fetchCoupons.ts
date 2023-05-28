import { ACCOUNTS } from '@/constants/strapi'
import { StrapiCoupon } from '@/type/strapi'
import axios from 'axios'

export async function fetchCoupons(limit?: number) {
  const accounts = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const response = await axios.get(`http://localhost:${account.name}/api/coupons`, {
        headers: {
          Authorization: `Bearer ${account.jwt}`,
        },
      })

      const accountDataWithAccountName = response.data.data.map((coupon: StrapiCoupon) => ({
        ...coupon,
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
