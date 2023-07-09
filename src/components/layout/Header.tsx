import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='w-fit m-auto z-10'>
      <Link href='/' className='inline-block p-10 md:p-16'>
        <Image
          src='/asset/img/logo.svg'
          alt='shushanchu'
          width={159}
          height={33}
          className='w-[13.4rem] h-[2.9rem] md:w-[15.9rem] md:h-[33rem'
        />
      </Link>
    </header>
  )
}

export default Header
