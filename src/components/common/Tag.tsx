import React, { FC, MouseEvent } from 'react'

type Props = {
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  children: React.ReactNode
} & Omit<JSX.IntrinsicElements['button'], 'onClick'>

const Tag: FC<Props> = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      <span className='text-s6'>{children}</span>
    </button>
  )
}

export default Tag
