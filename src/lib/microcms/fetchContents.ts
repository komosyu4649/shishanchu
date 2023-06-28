import { ACCOUNTS } from '@/constants/microcms'
import axios from 'axios'

export async function fetchContents(limit?: number) {
  // ACCOUNTSの分をmicrocmsのcreateClientで取得する
  const accounts = await Promise.all(
    ACCOUNTS.map(async (account) => {
      const response = await axios.get(
        `https://${account.name}.microcms.io/api/v1/features?limit=${limit}&offset=0`,
        {
          headers: {
            'X-API-KEY': account.key,
          },
        },
      )
      const accountDataWithAccountName = response.data.contents.map((content: any) => ({
        ...content,
        accountName: account.name,
        apiKey: account.key,
      }))
      return accountDataWithAccountName
    }),
  )
}
