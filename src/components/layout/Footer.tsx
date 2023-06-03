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
    <footer className='mt-80 pt-40 px-48 pb-64 bg-blackWeak'>
      <Link href='/' className='inline-block mb-24'>
        <Image src='/asset/img/logo.svg' alt='shushanchu' width={584} height={119} />
      </Link>
      <div className='grid grid-cols-[1fr_auto] justify-between pb-16'>
        <div className=''>
          <nav className='flex flex-row gap-40'>
            <ul className=''>
              {mainMenus.map((menu, index) => (
                <li key={index} className=''>
                  <Link href={`/${menu.path}/`} className='inline-block py-6 text-s5'>
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className=''>
              {subMenus.map((menu, index) => (
                <li key={index} className=''>
                  <Link href={`/${menu.path}/`} className='inline-block py-6 text-s5'>
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className=''>
          <nav className='grid grid-cols-2'>
            <ul className=''>
              {sns.map((menu, index) => (
                <li key={index} className=''>
                  <a href={`${menu.path}`} className='inline-block py-4 text-s3Lt'>
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
            <ul className=''>
              {attentionMenus.map((menu, index) => (
                <li key={index} className=''>
                  <a href={`${menu.path}`} className='inline-block py-4 text-s3Lt'>
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
