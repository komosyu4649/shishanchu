import { ACCOUNTS } from '@/constants/microcms'
import { createClient } from 'microcms-js-sdk'

export const fetchCommonJsonData = async (
  serviceDomain: string,
  apiKey: string,
  endpoint: string,
) => {
  const data = createClient({
    serviceDomain: serviceDomain,
    apiKey: apiKey,
  }).get({
    endpoint: endpoint,
  })
  //   const response = await res
  //   const responseData = Array.isArray(response) ? response : [response]

  //   return responseData.map((content) => ({
  //     ...content,
  //     accountName: account.name,
  //     storeName: account.store,
  //   }))
  return data
}
