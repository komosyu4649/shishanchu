import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Menu = () => {
  const menus = [
    {
      name: 'Contents',
      path: 'contents',
      icon: {
        path: 'iconContent',
        width: 20,
        height: 20,
      },
    },
    {
      name: 'Staffs',
      path: 'staffs',
      icon: {
        path: 'iconStaff',
        width: 20,
        height: 15.45,
      },
    },
    {
      name: 'Stores',
      path: 'stores',
      icon: {
        path: 'iconStore',
        width: 20,
        height: 17.78,
      },
    },
    {
      name: 'Coupons',
      path: 'coupons',
      icon: {
        path: 'iconCoupon',
        width: 20,
        height: 18.22,
      },
    },
  ]
  return (
    <nav className='fixed inset-x-0 bottom-12 w-fit m-auto bg-blackWeak border-2 border-solid border-green rounded-full z-10'>
      <ul className='flex flex-row justify-center items-center'>
        {menus.map((menu, index) => (
          //   <li key={index} className='border-r-2 border-green border-opacity-20 last:border-none'>
          <li
            key={index}
            className='relative before:content-[""] before:absolute before:top-12 before:right-0 before:inline-block before:w-[1px] before:h-6 before:bg-white before:opacity-60 last:before:hidden'
          >
            <Link href={`/${menu.path}/`} className='flex flex-row items-center gap-4 px-16 py-10'>
              <Image
                src={`/asset/img/${menu.icon.path}.svg`}
                alt={menu.name}
                width={menu.icon.width}
                height={menu.icon.height}
              />
              <span className='text-s4'>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
