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
  // const accuntData = ACCOUNTS.find((account) => account.name === store)
  // const stores = await axios.get(
  //   `http://localhost:${accuntData?.name}/api/stores/1?populate=icon,sns,information.system,information.budget,information.facility,information.businessHours[0],information.address,garelly.img,`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${accuntData?.jwt}`,
  //     },
  //   },
  // )
  // const storeData = stores.data.data

  // const coupons = await axios.get(`http://localhost:${accuntData?.name}/api/coupons`, {
  //   headers: {
  //     Authorization: `Bearer ${accuntData?.jwt}`,
  //   },
  // })
  // const couponsData = coupons.data.data.map((coupon: StrapiCoupon) => ({
  //   ...coupon,
  //   accountName: accuntData?.name,
  //   storeName: accuntData?.store,
  //   jwt: accuntData?.jwt,
  // }))

  // const response = await axios.get(`http://localhost:${accuntData?.name}/api/users?populate=icon`, {
  //   headers: {
  //     Authorization: `Bearer ${accuntData?.jwt}`,
  //   },
  // })

  // const staffsData = response.data.map((staff: StrapiStaff) => ({
  //   ...staff,
  //   accountName: accuntData?.name,
  //   storeName: accuntData?.store,
  //   jwt: accuntData?.jwt,
  // }))

  // const storeName = accuntData?.name
  // const storeStore = accuntData?.store

  return {
    props: {
      store,
      storeData,
      staffsData,
      // staffsData,
      // couponsData,
      // storeName,
      // storeStore,
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
    <div className='grid gap-16 w-[80rem] m-auto'>
      {/* system */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>システム</dt>
        <dd className=''>
          <ul className='grid grid-cols-auto gap-6'>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className=''>チャージ料</span>
              <span className='text-s5LhLgLt opacity-60'>{information.system[0].chargeFee}</span>
            </li>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className='text-s5LhLgLt'> シーシャ代</span>
              <span className='text-s5LhLgLt opacity-60'>{information.system[0].shishaFee}</span>
            </li>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className='text-s5LhLgLt'>ワンドリンク制</span>
              <span className='text-s5LhLgLt opacity-60'>{information.system[0].drinkFee}</span>
            </li>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className='text-s5LhLgLt'>オプション</span>
              <span className='text-s5LhLgLt opacity-60'>{information.system[0].options}</span>
            </li>
          </ul>
        </dd>
      </dl>
      {/* budget */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>予算</dt>
        <dd className='text-s5LhLgLt'>
          <span className=''>{information.budget[0].lowest}円 </span>~{' '}
          <span className=''>{information.budget[0].highest}円</span>
        </dd>
      </dl>
      {/* paymentMethod */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>お支払い方法</dt>
        <dd className=''>
          <ul className='flex flex-row flex-wrap gap-8'>
            {information.paymentMethod.map((paymentMethod, index) => (
              <li key={index} className=''>
                <span className='text-s5LhLgLt'>#{paymentMethod}</span>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
      {/* facility */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>設備</dt>
        <dd className=''>
          <ul className='flex flex-row flex-wrap gap-8'>
            {information.facility.map((facility, index) => (
              <li key={index} className=''>
                <span className='text-s5LhLgLt'>#{facility}</span>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
      {/* businessHours */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>営業時間</dt>
        <dd className='text-s5LhLgLt'>
          <ul className=''>
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
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>休業日</dt>
        <dd className=''>
          <span className='text-s5LhLgLt'>{information.holiday}</span>
        </dd>
      </dl>
      {/* address */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>店舗所在地</dt>
        <dd className=''>
          <a
            href={`https://www.google.com/maps/place/${encodeURIComponent(information.address)}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-s5LhLgLt underline'
          >
            {information.address}
          </a>
        </dd>
      </dl>
      {/* remarks */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>備考</dt>
        <dd className=''>
          <span className='text-s5LhLgLt'>{information.remarks}</span>
        </dd>
      </dl>
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
    <ul className='grid grid-cols-3 gap-8 justify-center'>
      {staffsData.map((staff, index) => (
        <li key={index} className=''>
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
    <div className=''>
      <ul className='grid grid-cols-3 gap-x-4 gap-y-10'>
        {garelly.map((g, index) => (
          <li key={index}>
            <Image
              src={g.image.url}
              width={g.image.width}
              height={g.image.height}
              alt={g.description}
              className='mb-4'
            />
            <span className='text-s3Lt'>{g.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// const StoreContentCoupon = ({
//   name,
//   couponsData,
// }: {
//   name: string
//   couponsData: StrapiCoupon[]
// }) => {
//   // const router = useRouter()
//   // useEffect(() => {
//   //   router.push({
//   //     pathname: `/${name}/`,
//   //     query: { type: 'coupon' },
//   //   })
//   // }, [])
//   return (
//     <ul className='grid grid-cols-3 gap-8 justify-center'>
//       {couponsData.map((coupon, index) => (
//         <li key={index} className=''>
//           <Coupon coupon={coupon} />
//         </li>
//       ))}
//     </ul>
//   )
// }

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

  const { icon, name, sns, description, storeName, accountName } = storeData

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
      <section className='w-[100rem] m-auto mt-36'>
        {/* profile */}
        <div className='grid grid-cols-[1fr_50rem]'>
          <div className='grid grid-cols-[auto_1fr] items-center gap-12'>
            <Image
              src={icon.url}
              width={icon.width}
              height={icon.height}
              alt={name}
              className='rounded-full w-60 h-60 object-cover'
            />
            <div className=''>
              <span className='text-s9'>{storeName}</span>
              <div className='flex flex-col gap-1 mt-4 text-s3'>
                {sns?.twitter && (
                  <a href={sns.twitter} className=''>
                    Twitter
                  </a>
                )}
                {sns?.instagram && (
                  <a href={sns.instagram} className=''>
                    Instagram
                  </a>
                )}
                {sns?.tiktok && (
                  <a href={sns.tiktok} className=''>
                    Tiktok
                  </a>
                )}
                {sns?.website && (
                  <a href={sns.website} className=''>
                    Webサイト
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className='mt-24'>
            <p className='text-s5LhLgLt whitespace-break-spaces'>{description}</p>
          </div>
        </div>
        {/* datas */}
        <div className='mt-32 '>
          {/* tab */}
          <nav className='border-b border-solid border-white border-opacity-60'>
            {/* <ul className='grid grid-cols-4'> */}
            <ul className='flex justify-center'>
              {tabData.map((tab, index) => (
                <li key={index} className=''>
                  <button
                    onClick={() => handleSwitchType(`${tab.type}`)}
                    className='w-full px-16 text-s6'
                  >
                    <span
                      className={`inline-block py-10 ${
                        contentType === `${tab.type}` && 'border-b-4 border-solid border-green'
                      }`}
                    >
                      {tab.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* content */}
          <div className='w-layoutSm m-auto mt-32'>
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
