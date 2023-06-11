import { chivo } from '@/pages/_app'
import React, { FC } from 'react'

type Props = {
  rangeWithDots: number[] | string[]
  page: number
  handleSelectPage: (pageNumber: number | string) => void
}

const Pagination: FC<Props> = ({ rangeWithDots, handleSelectPage, page }) => {
  return rangeWithDots.length > 1 ? (
    <nav>
      <ul className='flex items-center justify-center gap-4'>
        {rangeWithDots.map((pageNumber: number | string, index: number) => (
          <li key={index}>
            <button
              onClick={() => handleSelectPage(pageNumber)}
              className={`${
                pageNumber === '...' ? 'pointer-events-none border-none' : 'pointer-events-auto'
              } ${pageNumber === Number(page) ? 'bg-blackWeak' : 'bg-none'} text-s4 ${
                chivo.className
              } border-2 border-white border-opacity-60 rounded-xl w-16 h-16 flex items-center justify-center`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  ) : null
}

export default Pagination
