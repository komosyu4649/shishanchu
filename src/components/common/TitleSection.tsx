import { chivo } from '@/pages/_app'
import React, { FC } from 'react'

type Props = {
  en: string
  ja: string
  className?: string
}

const TitleSection: FC<Props> = ({ en, ja, className }) => {
  return (
    <h2 className={`flex flex-col gap-1 ${className}`}>
      <span className={`text-s1 text-green ${chivo.className}`}>{en}</span>
      <span className='text-s7'>{ja}</span>
    </h2>
  )
}
export default TitleSection
