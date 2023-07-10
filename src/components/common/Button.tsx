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
      className='flex justify-center w-full px-16 py-5 bg-green text-white text-s2 rounded-md'
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
