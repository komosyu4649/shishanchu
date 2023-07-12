import Link from 'next/link'
import React, { FC, MouseEvent } from 'react'

type Props = {
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  children: React.ReactNode
  href?: string
  color?: 'transparent'
  className?: string
} & Omit<JSX.IntrinsicElements['button'], 'onClick'>

const Button: FC<Props> = ({ onClick, children, href, color, className }) => {
  const classes = `flex justify-center w-full px-16 py-5 ${
    color === 'transparent' ? 'bg-none text-green border-2 border-green' : 'bg-green text-white'
  } text-s2 rounded-md ${className}
  md:px-24 md:py-6 md:text-s4
  `
  return href ? (
    <Link href={`/${href}/`} className={classes}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export default Button
