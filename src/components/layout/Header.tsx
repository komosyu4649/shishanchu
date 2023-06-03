import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='w-fit m-auto z-10'>
      <Link href='/' className='inline-block p-16'>
        <Image src='/asset/img/logo.svg' alt='shushanchu' width={159} height={33} />
      </Link>
    </header>
  )
}

export default Header
