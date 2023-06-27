export type CMSFeature = ContentsBase<{
  title: string
  thumbnail: Image
  introduction: string
  content: string
  featureCategories: ContentsBase<{
    name: string
  }>
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
