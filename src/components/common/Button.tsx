import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  children: React.ReactNode
  href: string
}

const Button: FC<Props> = ({ children, href }) => {
  return (
    <Link href={`/${href}/`} className='px-16 py-8 bg-white text-black text-s5 rounded-full'>
      {children}
    </Link>
  )
}

export default Button