import { ACCOUNTS } from '@/constants/microcms'
import { createClient } from 'microcms-js-sdk'

type Props = {
  store: string
  id: string
}

type IdAccount = {
  name: string
  store: string
  key: string
}

export const fetchCommonData = async (store: string, endpoint: string, id: string) => {
  const idAccount = ACCOUNTS.find((account) => account.name === store)
  if (!idAccount) return
  const { name, key } = idAccount
  const res = createClient({
    serviceDomain: name,
    apiKey: key,
  }).get({
    endpoint: endpoint,
    contentId: id,
  })
  return res
}
