import React, { FC } from 'react'

type Props = {
  title: string
  count?: number
  className?: string
}

const TitlePage: FC<Props> = ({ title, count, className }) => {
  return (
    <h1
      className={`
      relative gap-1 flex items-end m-auto pl-7 before:content-[""] before:absolute before:top-5 before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green ${className}
      md:gap-2 md:pl-10 md:before:top-5 md:before:w-4 md:before:h-4`}
    >
      <span
        className='
        text-s7 md:text-s8
      '
      >
        {title}
      </span>
      {count && (
        <span
          className='
        text-s2 md:text-s5'
        >
          【{count}】
        </span>
      )}
    </h1>
  )
}

export default TitlePage
