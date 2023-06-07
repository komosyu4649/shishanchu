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
      className='flex flex-row items-center gap-4 px-8 py-4 bg-blackWeak rounded-full border-2 border-white border-opacity-60'
    >
      <span className='text-s3'>{children}</span>
      <Image src='/asset/img/iconClosed.svg' width={10} height={10} alt='close' />
    </button>
  )
}

export default Tag
