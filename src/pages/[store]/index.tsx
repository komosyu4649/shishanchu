import Coupon from '@/components/item/Coupon'
import Staff from '@/components/item/Staff'
import Layout from '@/components/layout/Layout'
import { ACCOUNTS } from '@/constants/microcms'
import { fetchCommonJsonDatas } from '@/lib/microcms/fetchCommonJsonDatas'
import { fetchCommonListDatas } from '@/lib/microcms/fetchCommonListDatas'
import { CMSStaff, CMSStore } from '@/type/microcms'
import { StrapiCoupon, StrapiStaff } from '@/type/strapi'
import axios from 'axios'
import { marked } from 'marked'
import Image from 'next/image'
import { NextRouter, useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

export const getStaticPaths = async () => {
  return {
    paths: ACCOUNTS.map((account) => ({
      params: {
        store: account.name,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (params: any) => {
  const { store } = params.params
  const storeDatas = await fetchCommonJsonDatas('store')
  const storeData = storeDatas.find((s) => s.accountName === store)
  const allStaffsDatas = await fetchCommonListDatas('staffs')
  const staffsData = allStaffsDatas.filter((s) => s.accountName === store)

  return {
    props: {
      store,
      storeData,
      staffsData,
    },
  }
}

const StoreContent = ({
  accountName,
  name,
  contentType,
  storeData,
  staffsData,
  couponsData,
}: {
  accountName: string
  name: string
  contentType: string | string[]
  storeData: CMSStore
  staffsData: CMSStaff[]
  couponsData: StrapiCoupon[]
}): JSX.Element | null => {
  switch (contentType) {
    case 'staff':
      return <StoreContentStaff accountName={accountName} staffsData={staffsData} />
    case 'garelly':
      return <StoreContentGarelly accountName={accountName} storeData={storeData} />
    // case 'coupon':
    //   return <StoreContentCoupon name={name} couponsData={couponsData} />
    default:
      return <StoreContentInformation accountName={accountName} storeData={storeData} />
      break
  }
  // return null
}

const StoreContentInformation = ({
  accountName,
  storeData,
}: {
  accountName: string
  storeData: CMSStore
}) => {
  const router = useRouter()
  useEffect(() => {
    router.push({
      pathname: accountName,
    })
  }, [])

  const { information } = storeData

  return (
    <div
      className='
        w-layoutMbDefault grid gap-10 m-auto
        md:gap-16 md:w-[80rem]
      '
    >
      {/* system */}
      <dl
        className='
          grid gap-4 pb-10 border-b border-solid border-white border-opacity-60
          md:grid-cols-[1fr_60rem] md:pb-16 
        '
      >
        <dt
          className='
            relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5 md:before:top-4 before:left-0 before:inline-block before:w-3 before:h-3 md:before:w-4 md:before:h-4 before:bg-green before:rounded-full
          '
        >
          システム
        </dt>
        <dd className='pl-8'>
          <ul
            className='
            grid grid-cols-auto gap-4 
            md:gap-6
          '
          >
            <li className='flex flex-col text-s4LhLgLt'>
              <span className=''>チャージ料</span>
              <span className='text-s3Lt opacity-60'>{information.system[0].chargeFee}</span>
            </li>
            <li className='flex flex-col text-s4LhLgLt'>
              <span className=''> シーシャ代</span>
              <span className='text-s3Lt opacity-60'>{information.system[0].shishaFee}</span>
            </li>
            <li className='flex flex-col text-s4LhLgLt'>
              <span className=''>ワンドリンク制</span>
              <span className='text-s3Lt opacity-60'>{information.system[0].drinkFee}</span>
            </li>
            <li className='flex flex-col text-s4LhLgLt'>
              <span className=''>オプション</span>
              <span className='text-s3Lt opacity-60'>{information.system[0].options}</span>
            </li>
          </ul>
        </dd>
      </dl>
      {/* budget */}
      <dl
        className='
        grid  gap-2 pb-10 border-b border-solid border-white border-opacity-60
        md:grid-cols-[1fr_60rem] md:gap-4 md:pb-16 
      '
      >
        <dt
          className='
            relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5 before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green before:rounded-full
            md:before:top-4 md:before:w-4 md:before:h-4
          '
        >
          予算
        </dt>
        <dd className='pl-8 text-s4LhLgLt'>
          <span className=''>{information.budget[0].lowest}円 </span>~{' '}
          <span className=''>{information.budget[0].highest}円</span>
        </dd>
      </dl>
      {/* paymentMethod */}
      <dl
        className='
          grid gap-2 pb-10 border-b border-solid border-white border-opacity-60
          md:grid-cols-[1fr_60rem] md:gap-4 md:pb-16
        '
      >
        <dt
          className='
          relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5 before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green before:rounded-full
          md:before:top-4 md:before:w-4 md:before:h-4'
        >
          お支払い方法
        </dt>
        <dd className=''>
          <ul
            className='
              flex flex-row flex-wrap gap-x-6 pl-8
              md:gap-8
            '
          >
            {information.paymentMethod.map((paymentMethod, index) => (
              <li key={index} className=''>
                <span
                  className='
                  text-s4LhLgLt 
                  md:text-s5LhLgLt
                '
                >
                  #{paymentMethod}
                </span>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
      {/* facility */}
      <dl
        className='
          grid gap-2 pb-10 border-b border-solid border-white border-opacity-60
          md:grid-cols-[1fr_60rem] md:gap-4  md:pb-16'
      >
        <dt
          className='
            relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5 before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green before:rounded-full
            md:before:top-4  md:before:w-4 md:before:h-4
          '
        >
          設備
        </dt>
        <dd className=''>
          <ul
            className='
            flex flex-row flex-wrap gap-x-6 
            md:gap-8 pl-8
          '
          >
            {information.facility.map((facility, index) => (
              <li key={index} className=''>
                <span
                  className='
                  text-s4LhLgLt 
                  md:text-s5LhLgLt
                '
                >
                  #{facility}
                </span>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
      {/* businessHours */}
      <dl
        className='
          grid gap-2 pb-10 border-b border-solid border-white border-opacity-60
          md:grid-cols-[1fr_60rem] md:gap-4  md:pb-16'
      >
        <dt
          className='
            relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5  before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green before:rounded-full
            md:before:top-4 md:before:w-4 md:before:h-4
          '
        >
          営業時間
        </dt>
        <dd
          className='
          text-s4LhLgLt 
          md:text-s5LhLgLt
        '
        >
          <ul className='pl-8'>
            <li className=''>
              <span className=''>月曜日 : </span>
              {information.businessHours[0].monday[0].openingHour &&
              information.businessHours[0].monday[0].closingHours ? (
                <span>
                  <span className=''>{information.businessHours[0].monday[0].openingHour}</span>〜
                  <span className=''>{information.businessHours[0].monday[0].closingHours}</span>
                </span>
              ) : (
                <span>定休日</span>
              )}
            </li>
            <li className=''>
              <span className=''>火曜日 : </span>
              {information.businessHours[0].tuesday[0].openingHour &&
              information.businessHours[0].tuesday[0].closingHours ? (
                <span>
                  <span className=''>{information.businessHours[0].tuesday[0].openingHour}</span>〜
                  <span className=''>{information.businessHours[0].tuesday[0].closingHours}</span>
                </span>
              ) : (
                <span>定休日</span>
              )}
            </li>
            <li className=''>
              <span className=''>水曜日 : </span>
              {information.businessHours[0].wednesday[0].openingHour &&
              information.businessHours[0].wednesday[0].closingHours ? (
                <span>
                  <span className=''>{information.businessHours[0].wednesday[0].openingHour}</span>
                  〜
                  <span className=''>{information.businessHours[0].wednesday[0].closingHours}</span>
                </span>
              ) : (
                <span>定休日</span>
              )}
            </li>
            <li className=''>
              <span className=''>木曜日 : </span>
              {information.businessHours[0].thursday[0].openingHour &&
              information.businessHours[0].thursday[0].closingHours ? (
                <span>
                  <span className=''>{information.businessHours[0].thursday[0].openingHour}</span>〜
                  <span className=''>{information.businessHours[0].thursday[0].closingHours}</span>
                </span>
              ) : (
                <span>定休日</span>
              )}
            </li>
            <li className=''>
              <span className=''>金曜日 : </span>
              {information.businessHours[0].friday[0].openingHour &&
              information.businessHours[0].friday[0].closingHours ? (
                <span>
                  <span className=''>{information.businessHours[0].friday[0].openingHour}</span>〜
                  <span className=''>{information.businessHours[0].friday[0].closingHours}</span>
                </span>
              ) : (
                <span>定休日</span>
              )}
            </li>
            <li className=''>
              <span className=''>土曜日 : </span>
              {information.businessHours[0].saturday[0].openingHour &&
              information.businessHours[0].saturday[0].closingHours ? (
                <span>
                  <span className=''>{information.businessHours[0].saturday[0].openingHour}</span>〜
                  <span className=''>{information.businessHours[0].saturday[0].closingHours}</span>
                </span>
              ) : (
                <span>定休日</span>
              )}
            </li>
            <li className=''>
              <span className=''>日曜日 : </span>
              {information.businessHours[0].sunday[0].openingHour &&
              information.businessHours[0].sunday[0].closingHours ? (
                <span>
                  <span className=''>{information.businessHours[0].sunday[0].openingHour}</span>〜
                  <span className=''>{information.businessHours[0].sunday[0].closingHours}</span>
                </span>
              ) : (
                <span>定休日</span>
              )}
            </li>
          </ul>
        </dd>
      </dl>
      {/* holiday */}
      <dl
        className='
          grid pb-16 border-b border-solid border-white border-opacity-60
          md:grid-cols-[1fr_60rem]
        '
      >
        <dt
          className='
            relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5  before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green before:rounded-full
            md:before:top-4 md:before:w-4 md:before:h-4
          '
        >
          休業日
        </dt>
        <dd className='pl-8'>
          <span
            className='
            text-s4LhLgLt 
            md:text-s5LhLgLt
          '
          >
            {information.holiday}
          </span>
        </dd>
      </dl>
      {/* address */}
      <dl
        className='
          grid pb-16 border-b border-solid border-white border-opacity-60
          md:grid-cols-[1fr_60rem]
      '
      >
        <dt
          className='
            relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5 before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green before:rounded-full
            md:before:top-4 md:before:w-4 md:before:h-4
          '
        >
          店舗所在地
        </dt>
        <dd className='pl-8'>
          <a
            href={`https://www.google.com/maps/place/${encodeURIComponent(information.address)}`}
            target='_blank'
            rel='noopener noreferrer'
            className='
              text-s4LhLgLt 
              md:text-s5LhLgLt underline
            '
          >
            {information.address}
          </a>
        </dd>
      </dl>
      {/* remarks */}
      {information.remarks && (
        <dl
          className='
            grid pb-16 border-b border-solid border-white border-opacity-60
            md:grid-cols-[1fr_60rem] 
        '
        >
          <dt
            className='
              relative pl-8 text-s5LhLg before:content-[""] before:absolute before:top-5 before:left-0 before:inline-block before:w-3 before:h-3 before:bg-green before:rounded-full
              md:before:top-4 md:before:w-4 md:before:h-4
          '
          >
            備考
          </dt>
          <dd className='pl-8'>
            <span className='text-s5LhLgLt'>{information.remarks}</span>
          </dd>
        </dl>
      )}
    </div>
  )
}

const StoreContentStaff = ({
  accountName,
  staffsData,
}: {
  accountName: string
  staffsData: CMSStaff[]
}) => {
  const router = useRouter()

  useEffect(() => {
    router.push({
      pathname: accountName,
      query: { type: 'staff' },
    })
  }, [])

  return (
    <ul
      className='
        flex gap-8 justify-center border-t border-white border-opacity-60
        md:grid md:grid-cols-2 md:w-[80rem] md:m-auto md:border-none 
      '
    >
      {staffsData.map((staff, index) => (
        <li
          key={index}
          className='
            border-b border-white border-opacity-60
            md:h-fit md:border md:rounded-md md:overflow-hidden
          '
        >
          <Staff staff={staff} />
        </li>
      ))}
    </ul>
  )
}

const StoreContentGarelly = ({
  accountName,
  storeData,
}: {
  accountName: string
  storeData: CMSStore
}) => {
  const router = useRouter()
  useEffect(() => {
    router.push({
      pathname: accountName,
      query: { type: 'garelly' },
    })
  }, [])

  const { garelly } = storeData

  return (
    <div
      className='
        w-layoutMbDefault m-auto
        md:w-full
    '
    >
      <ul
        className='
          grid grid-cols-2 gap-x-4 gap-y-6
          md:grid-cols-3 md:gap-y-10
        '
      >
        {garelly.map((g, index) => (
          <li key={index}>
            <Image
              src={g.image.url}
              width={g.image.width}
              height={g.image.height}
              alt={g.description}
              className='
                mb-2 
                md:mb-4
              '
            />
            <span
              className='
              text-s1Lt 
              md:text-s3Lt
            '
            >
              {g.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function StoreDetail({
  storeData,
  staffsData,
  couponsData,
}: {
  storeData: CMSStore
  staffsData: CMSStaff[]
  couponsData: StrapiCoupon[]
}) {
  const router: NextRouter = useRouter()
  const [contentType, setContentType] = useState<string | string[]>(router.query.type || '')

  useEffect(() => {
    if (router.query.type) {
      setContentType(router.query.type)
    }
  }, [router.isReady, router.query.type])

  const handleSwitchType = (switchType: string) => {
    setContentType(switchType)
  }

  const { icon, sns, description, storeName, accountName } = storeData

  const tabData = [
    {
      name: '店舗情報',
      type: '',
    },
    {
      name: 'スタッフ',
      type: 'staff',
    },
    {
      name: 'ギャラリー',
      type: 'garelly',
    },
    // {
    //   name: 'クーポン',
    //   type: 'coupon',
    // },
  ]

  return (
    <Layout>
      <section
        className='
          w-full m-auto mt-36
          md:w-layoutSm md:mt-60
        '
      >
        {/* profile */}
        <div
          className='
            grid w-layoutMbDefault m-auto
            md:gap-12 md:w-full 
          '
        >
          <div
            className='
              grid items-center gap-6 
              md:grid-cols-[auto_1fr] md:gap-8 md:m-auto
          '
          >
            <Image
              src={icon.url}
              width={icon.width}
              height={icon.height}
              alt={storeName}
              className='
                w-full aspect-square rounded-md object-cover
                md:w-80
              '
            />
            <div className=''>
              <span
                className='
                  text-s7 
                  md:text-s8
              '
              >
                {storeName}
              </span>
              {sns && (
                <div
                  className='
                flex flex-row items-center gap-4 mt-3 text-s3
              '
                >
                  {sns?.twitter && (
                    <a href={sns.twitter} className=''>
                      {/* Twitter */}
                      <Image src='/asset/img/snsTwitter.svg' width={20} height={20} alt='twitter' />
                    </a>
                  )}
                  {sns?.instagram && (
                    <a href={sns.instagram} className=''>
                      {/* Instagram */}
                      <Image
                        src='/asset/img/snsInstagram.svg'
                        width={18}
                        height={18}
                        alt='instagram'
                      />
                    </a>
                  )}
                  {sns?.tiktok && (
                    <a href={sns.tiktok} className=''>
                      {/* Tiktok */}
                      <Image src='/asset/img/snsTiktok.svg' width={18} height={18} alt='tiktok' />
                    </a>
                  )}
                  {sns?.website && (
                    <a href={sns.website} className=''>
                      {/* Webサイト */}
                      <Image src='/asset/img/iconSite.svg' width={18} height={18} alt='Webサイト' />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className='
              flex items-end mt-8 
              md:justify-center md:mt-0
          '
          >
            <p
              className='
                text-s3Lt whitespace-break-spaces
                md:text-s5LhLgLt md:text-center
              '
            >
              {description}
            </p>
          </div>
        </div>
        {/* datas */}
        <div
          className='
            mt-12
            md:mt-24
          '
        >
          {/* tab */}
          <nav
            className='
              border-b border-solid border-white border-opacity-60
            '
          >
            <ul
              className='
              flex justify-center
            '
            >
              {tabData.map((tab, index) => (
                <li key={index} className=''>
                  <button
                    onClick={() => handleSwitchType(`${tab.type}`)}
                    className='
                      w-full px-6 text-s3
                      md:px-16 md:text-s4
                    '
                  >
                    <span
                      className={`
                        inline-block py-6 
                        md:py-8 
                        ${contentType === `${tab.type}` && 'border-b-4 border-solid border-green'}`}
                    >
                      {tab.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* content */}
          <div
            className='
              m-auto mt-16
              md:w-layoutSm md:mt-24
            '
          >
            <StoreContent
              accountName={accountName}
              name={storeName}
              contentType={contentType}
              storeData={storeData}
              staffsData={staffsData}
              couponsData={couponsData}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}
