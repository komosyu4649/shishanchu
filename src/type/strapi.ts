import { types } from 'util'

export type StrapiFeature = Base<{
  attributes: {
    title: string
    content: string
    introduction: string
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
    sns: {
      id: number
      twitter: string
      instagram: string
      tiktok: string
      other: string
    }
    profile: {
      id: number
      birthplace: string
      career: string
      gender: string
    }
  } & Date
>

export type StrapiStore = Base<{
  attributes: {
    name: string
    description: string
    icon: { data: { id: number; attributes: ImageFormat } }
    sns: {
      id: number
      twitter: string
      instagram: string
      tiktok: string
      other: string
    }
    information: {
      id: number
      holiday: string
      remarks: string
      budget: { id: number; lowest: number; highest: number }
      address: {
        url: string
        name: string
      }
      system: {
        chargeFee: string
        shishaFee: string
        oneDrinkSystem: string
        options: string
      }
      businessHours: {
        same: string
        monday: string
        tuesday: string
        wednesday: string
        thursday: string
        friday: string
        saturday: string
        sunday: string
      }
      facility: {
        name: string
      }[]
    }
    garelly: {
      id: number
      name: string
      img: {
        data: {
          attributes: {
            url: string
            width: number
            height: number
            name: string
          }
        }
      }
    }[]
  } & Date
}>

export type StrapiCoupon = Base<{
  attributes: {
    title: string
    termsOfUse: string
    presentationConditions: string
    dateOfExpiry: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    types: string
  }
}>

type Base<T> = {
  id: number
  accountName: string
  storeName: string
  region?: {
    prefectures: string
    city: string
  }
  jwt: string
} & T

export type Account = {
  name: string
  store: string
  jwt: string
}

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
