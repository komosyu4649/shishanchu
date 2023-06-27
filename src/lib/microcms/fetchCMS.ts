import { client } from '.'

export const getMicroCMSData = async (endpointName: string, contentId: string) => {
  const res = await client.get({
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
  const res = await client.getList({
    endpoint: endpointName,
    queries: {
      offset: offsetNumber,
      limit: limitNumber,
    },
  })
  return res
}
