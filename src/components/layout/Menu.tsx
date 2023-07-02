import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Menu = () => {
  const menus = [
    {
      name: '投稿',
      path: 'contents',
      icon: {
        path: 'iconContent',
        width: 20,
        height: 20,
      },
    },
    {
      name: 'スタッフ',
      path: 'staffs',
      icon: {
        path: 'iconStaff',
        width: 20,
        height: 15.45,
      },
    },
    {
      name: '店舗',
      path: 'stores',
      icon: {
        path: 'iconStore',
        width: 20,
        height: 17.78,
      },
    },
    // {
    //   name: 'Coupons',
    //   path: 'coupons',
    //   icon: {
    //     path: 'iconCoupon',
    //     width: 20,
    //     height: 18.22,
    //   },
    // },
  ]
  return (
    <nav className='fixed inset-x-0 bottom-8 w-fit m-auto px-12 bg-blackWeak border-2 border-solid border-green rounded-full z-10'>
      <ul className='flex flex-row justify-center items-center'>
        {menus.map((menu, index) => (
          <li
            key={index}
            className='relative before:content-[""] before:absolute before:top-10 before:right-0 before:inline-block before:w-[1px] before:h-8 before:bg-white before:opacity-60 last:before:hidden'
          >
            <Link href={`/${menu.path}/`} className='flex flex-col items-center gap-1 px-16 py-4'>
              <Image
                src={`/asset/img/${menu.icon.path}.svg`}
                alt={menu.name}
                width={menu.icon.width}
                height={menu.icon.height}
                className='w-10'
              />
              <span className='text-s1Lt'>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
