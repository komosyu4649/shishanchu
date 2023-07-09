import Link from 'next/link'
import React, { FC, MouseEvent } from 'react'

type Props = {
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  children: React.ReactNode
  href?: string
} & Omit<JSX.IntrinsicElements['button'], 'onClick'>

const Button: FC<Props> = ({ onClick, children, href }) => {
  return href ? (
    <Link
      href={`/${href}/`}
      className='flex justify-center w-full px-16 py-6 bg-green text-white text-s3 rounded-md'
    >
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className='px-16 py-8 bg-white text-black text-s5 rounded-full'>
      {children}
    </button>
  )
}

export default Button
