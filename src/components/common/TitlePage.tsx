import React, { FC } from 'react'

type Props = {
  title: string
  count?: number
  className?: string
}

const TitlePage: FC<Props> = ({ title, count, className }) => {
  return (
    <h1
      className={`relative gap-1 flex items-end m-auto pl-5 md:pl-10 before:content-[""] before:absolute before:top-5 md:before:top-6 before:left-0 before:inline-block before:w-2 before:h-2 md:before:w-4 md:before:h-4 before:bg-green before:rounded-full 
     md:gap-6 ${className}`}
    >
      <span className='text-s7 md:text-s9'>{title}</span>
      {count && <span className='text-s2 md:text-s7'>【{count}】</span>}
    </h1>
  )
}

export default TitlePage
