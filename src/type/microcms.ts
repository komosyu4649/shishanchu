export type CMSFeature = ContentsBase<{
  title: string
  thumbnail: Image
  introduction: string
  content: string
  featureCategories: ContentsBase<{
    name: string
  }>
}>

export type CMSContents = ContentsBase<{
  title: string
  thumbnail: Image
  content: string
  staff: CMSStaff
}>

export type CMSStaff = ContentsBase<{
  name: string
  icon: Image[]
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
}>

type Image = {
  url: string
  height: number
  width: number
}

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
