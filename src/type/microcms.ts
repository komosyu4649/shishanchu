type ContentsBase<P> = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
} & P

type Base<T, P> = {
  totalCount: number
  offset: number
  limit: number
} & ContentsBase<P> &
  T

type ImageBase = {
  url: string
  height: number
  width: number
}

type BusinessHour = {
  fieldId: string
  openingHour: string
  closingHours: string
}

type PaymentMethod = ['現金', 'QRコード決済', '電子マネー']

type Facility = ['Wi-Fi', 'コンセント']

export type CMSFeature = ContentsBase<{
  title: string
  thumbnail: ImageBase
  introduction: string
  content: string
  featureCategories: ContentsBase<{
    name: string
  }>
}>

export type CMSContents = ContentsBase<{
  title: string
  thumbnail: ImageBase
  content: string
  staff: CMSStaff
  accountName: string
  storeName: string
}>

export type CMSStaff = ContentsBase<{
  name: string
  icon: ImageBase
  biography: string
  sns: {
    fieldId: 'sns'
    twitter?: string
    instagram?: string
    tiktok?: string
    website?: string
  }
  profile: {
    fieldId: 'profile'
    birthplace: string
    career: string
    gender: '女性' | '男性' | '回答しない'
  }
  accountName: string
  storeName: string
}>

export type CMSStore = ContentsBase<{
  icon: ImageBase
  description: string
  sns?: {
    fieldId: string
    twitter?: string
    instagram?: string
    tiktok?: string
    website?: string
  }
  information: {
    fieldId: string
    system: {
      fieldId: string
      chargeFee: string
      shishaFee: string
      drinkFee: string
      options: string
    }[]
    budget: {
      fieldId: string
      lowest: number
      highest: number
    }[]
    facility: Facility
    businessHours: {
      fieldId: string
      sunday: BusinessHour[]
      monday: BusinessHour[]
      tuesday: BusinessHour[]
      wednesday: BusinessHour[]
      thursday: BusinessHour[]
      friday: BusinessHour[]
      saturday: BusinessHour[]
    }[]
    holiday: string
    address: string
    tel: string
    paymentMethod: PaymentMethod
    remarks: string
  }
  garelly: {
    fieldId: string
    image: ImageBase
    description: string
  }[]
  accountName: string
  storeName: string
}>
