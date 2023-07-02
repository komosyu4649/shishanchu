import { createClient } from 'microcms-js-sdk'
import { cmsClient } from '.'

export const getMicroCMSData = async (endpointName: string, contentId: string) => {
  const res = await cmsClient.get({
    endpoint: endpointName,
    contentId: contentId,
  })
  return res
}

export const getMicroCMSDataList = async (
  endpointName: string,
  offsetNumber: number = 0,
  limitNumber: number = 100,
) => {
  const res = await cmsClient.getList({
    endpoint: endpointName,
    queries: {
      offset: offsetNumber,
      limit: limitNumber,
    },
  })
  return res.contents
}
