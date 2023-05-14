export type StrapiContent = Base<{
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
}>

export type StrapiStaff = Base<
  {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    biography: string
    icon: {
      id: number
      name: string
      alternativeText?: string
      caption?: string
      width: number
      height: number
      formats: {
        thumbnail: ImageFormat
        small: ImageFormat
        large: ImageFormat
        medium: ImageFormat
      }
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      provider_metadata?: string
    }
  } & Date
>

type Base<T> = {
  id: number
  accountName: string
  storeName: string
  jwt: string
} & T

type Date = {
  createdAt: string
  updatedAt: string
  publishedAt?: string
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
