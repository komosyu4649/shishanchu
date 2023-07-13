import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const mainMenus = [
    {
      name: 'スタッフ投稿一覧',
      path: 'contents',
    },
    {
      name: 'スタッフ一覧',
      path: 'staffs',
    },
    {
      name: '店舗一覧',
      path: 'stores',
    },
    {
      name: 'クーポン一覧',
      path: 'coupons',
    },
  ]

  const subMenus = [
    {
      name: '特集一覧',
      path: 'features',
    },
    {
      name: 'お知らせ一覧',
      path: 'news',
    },
    {
      name: 'shishanchuについて',
      path: 'about',
    },
    {
      name: 'お問い合わせ',
      path: 'contact',
    },
  ]
  const sns = [
    {
      name: 'Instagram',
      path: 'https://www.instagram.com/shishanchu_official/',
    },
    {
      name: 'Youtube',
      path: 'https://w',
    },
  ]
  const attentionMenus = [
    {
      name: '利用規約',
      path: 'terms',
    },
    {
      name: 'プライバシーポリシー',
      path: 'privacy',
    },
  ]
  const thisYear = new Date().getFullYear()
  return (
    <footer
      className='
      mt-40 px-[1.6rem] pt-14 pb-32 bg-blackWeak 
      md:mt-80 md:pt-40 md:px-48 md:pb-56
    '
    >
      <Link
        href='/'
        className='
        flex justify-center mb-4 
        md:inline-block md:mb-24
      '
      >
        <Image
          src='/asset/img/logo.svg'
          alt='shushanchu'
          width={584}
          height={119}
          className='
            w-[32.1rem] h-[6.5rem] 
            md:w-[58.4rem] md:h-[11.9rem]
          '
        />
      </Link>
      <div
        className='
          grid grid-cols-auto mb-12 
          md:grid-cols-[1fr_auto] md:justify-between md:mb-24 md:pb-0
        '
      >
        <div
          className='
          mb-6 pb-7 border-b border-white
          md:mb-0 md:pb-0 md:border-none
          '
        >
          <nav
            className='
            flex flex-row justify-between gap-12 w-[32rem] m-auto 
            md:gap-40 md:w-fit md:m-0
          '
          >
            <ul className=''>
              {mainMenus.map((menu, index) => (
                <li key={index} className=''>
                  <Link
                    href={`/${menu.path}/`}
                    className='
                      inline-block py-3 text-s3 
                      md:py-6 md:text-s5
                    '
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className=''>
              {subMenus.map((menu, index) => (
                <li key={index} className=''>
                  <Link
                    href={`/${menu.path}/`}
                    className='
                      inline-block py-3 text-s3 
                      md:py-6 md:text-s5
                    '
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className=''>
          <nav className='grid grid-cols-2 gap-12 w-[32rem] m-auto'>
            <ul className=''>
              {sns.map((menu, index) => (
                <li key={index} className=''>
                  <a
                    href={`${menu.path}`}
                    className='
                      inline-block py-2 text-s1Lt opacity-70
                      md:py-4 md:text-s3Lt
                    '
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
            <ul className=''>
              {attentionMenus.map((menu, index) => (
                <li key={index} className=''>
                  <a
                    href={`${menu.path}`}
                    className='
                      inline-block py-2 text-s1Lt opacity-70 
                      md:py-4 md:text-s3Lt
                    '
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <small className='flex justify-center text-s1'>@copyright Shishanchu {thisYear}</small>
    </footer>
  )
}

export default Footer
