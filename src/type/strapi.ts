export type StrapiContent = {
  id: string
  accountName: string
  storeName: string
  jwt: string
  attributes: {
    title: string
    content: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    users_permissions_user: any
    thumbnail: {
      data: {
        id: number
        attributes: {
          alternativeText?: string
          caption?: string
          createdAt: string
          ext: string
          formats: {
            thumbnail: ImageFormat
            small: ImageFormat
            large: ImageFormat
            medium: ImageFormat
          }
          hash: string
          height: number
          mime: string
          name: string
          previewUrl?: string
          provider: string
          provider_metadata?: string
          size: number
          updatedAt: string
          url: string
          width: number
          id: number
        }
      }
    }
  }
}

type ImageFormat = {
  ext: string
  hash: string
  height: number
  mime: string
  name: string
  path?: string
  size: number
  url: string
  width: number
}
