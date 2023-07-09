import { chivo } from '@/pages/_app'
import React, { FC } from 'react'

type Props = {
  en: string
  ja: string
}

const TitleSection: FC<Props> = ({ en, ja }) => {
  return (
    <h2 className='flex flex-col gap-2'>
      <span className={`text-s1 text-green ${chivo.className}`}>{en}</span>
      <span className='text-s7'>{ja}</span>
    </h2>
  )
}
export default TitleSection
