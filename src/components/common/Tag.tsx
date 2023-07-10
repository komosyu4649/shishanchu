import Image from 'next/image'
import React, { FC, MouseEvent } from 'react'

type Props = {
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  children: React.ReactNode
} & Omit<JSX.IntrinsicElements['button'], 'onClick'>

const Tag: FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className='flex flex-row items-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-4 bg-blackWeak rounded-xl border-2 border-white border-opacity-60'
    >
      <span className='text-s1 md:text-s3'>{children}</span>
      <Image src='/asset/img/iconClosed.svg' width={10} height={10} alt='close' />
    </button>
  )
}

export default Tag
