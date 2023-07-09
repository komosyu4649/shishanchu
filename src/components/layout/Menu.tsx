import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Menu = () => {
  const menus = [
    {
      name: '特集',
      path: 'features',
      icon: {
        path: 'iconFeature',
        width: 20,
        height: 20,
      },
    },
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
    <nav className='fixed inset-x-0 bottom-0 w-full m-auto px-8 border-t border-green bg-blackWeak z-10 md:bottom-8 md:w-fit md:px-12 md:rounded-full md:border md:border-solid '>
      <ul className='flex flex-row justify-center items-center'>
        {menus.map((menu, index) => (
          <li
            key={index}
            className='relative before:content-[""] before:absolute before:top-10 before:right-0 before:inline-block before:w-[1px] before:h-8 before:bg-white before:opacity-60 last:before:hidden'
          >
            <Link
              href={`/${menu.path}/`}
              className='flex flex-col items-center gap-1 px-10 py-4 md:px-16'
            >
              <Image
                src={`/asset/img/${menu.icon.path}.svg`}
                alt={menu.name}
                width={menu.icon.width}
                height={menu.icon.height}
                className='w-8 md:w-10'
              />
              <span className='text-s0Lt md:text-s1Lt'>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
