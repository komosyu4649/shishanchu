import Staff from '@/components/item/Staff'
import { ACCOUNTS } from '@/constants/strapi'
import { StrapiStaff, StrapiStore } from '@/type/strapi'
import axios from 'axios'
import { marked } from 'marked'
import Image from 'next/image'
import { createContext, useContext, useState } from 'react'

export const getStaticPaths = async () => {
  const stores = await fetch('http://localhost:3000/api/strapi/getAllStores')
  const storesData: StrapiStore[] = await stores.json()
  return {
    paths: storesData.map((store) => ({
      params: {
        store: store.accountName,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (params: any) => {
  const { store } = params.params
  const accuntData = ACCOUNTS.find((account) => account.name === store)
  const stores = await axios.get(
    `http://localhost:${accuntData?.name}/api/stores/1?populate=icon,sns,information.system,information.budget,information.facility,information.businessHours,information.address,garelly.img,`,
    {
      headers: {
        Authorization: `Bearer ${accuntData?.jwt}`,
      },
    },
  )
  const storeData = stores.data.data

  // const staffs = await axios.get(`http://localhost:${accuntData?.name}/api/users?populate=icon`, {
  //   headers: {
  //     Authorization: `Bearer ${accuntData?.jwt}`,
  //   },
  // })
  // const staffsData = staffs.data

  // console.log(accuntData)
  // const staffsData: StrapiStaff[] = await Promise.all(
  // ACCOUNTS.map(async (account) => {
  const response = await axios.get(`http://localhost:${accuntData.name}/api/users?populate=icon`, {
    headers: {
      Authorization: `Bearer ${accuntData?.jwt}`,
    },
  })
  const staffsData = response.data.map((staff: StrapiStaff) => ({
    ...staff,
    accountName: accuntData?.name,
    storeName: accuntData?.store,
    jwt: accuntData?.jwt,
  }))
  // console.log(staffsData)
  // }),
  // )

  return {
    props: {
      storeData,
      staffsData,
      name: accuntData?.name,
    },
  }
}

const StoreContent = ({ name, contentType, storeData, staffsData }) => {
  // console.log(contentType)
  switch (contentType) {
    case 'information':
      return <StoreContentInformation storeData={storeData} />
    case 'staff':
      return <StoreContentStaff staffsData={staffsData} />
    case 'garelly':
      return <StoreContentGarelly name={name} storeData={storeData} />
    case 'coupon':
      return <StoreContentCoupon storeData={storeData} />
    default:
      break
  }
}

const StoreContentInformation = ({ storeData }) => {
  const googleMapTag = marked(storeData.attributes.information.address.tag)
  return (
    <div className='grid gap-16 w-[80rem] m-auto'>
      {/* system */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>システム</dt>
        <dd className=''>
          <ul className='grid grid-cols-auto gap-6'>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className=''>チャージ料</span>
              <span className='text-s5LhLgLt opacity-60'>
                {storeData.attributes.information.system.chargeFee}
              </span>
            </li>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className='text-s5LhLgLt'> シーシャ代</span>
              <span className='text-s5LhLgLt opacity-60'>
                {storeData.attributes.information.system.shishaFee}
              </span>
            </li>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className='text-s5LhLgLt'>ワンドリンク制</span>
              <span className='text-s5LhLgLt opacity-60'>
                {storeData.attributes.information.system.oneDrinkSystem}
              </span>
            </li>
            <li className='relative flex flex-col pl-8 text-s5LhLgLt before:content-[""] before:absolute before:top-4 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
              <span className='text-s5LhLgLt'>オプション</span>
              <span className='text-s5LhLgLt opacity-60'>
                {storeData.attributes.information.system.options}
              </span>
            </li>
          </ul>
        </dd>
      </dl>
      {/* budget */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>予算</dt>
        <dd className='text-s5LhLgLt'>
          <span className=''>{storeData.attributes.information.budget.lowest}円 </span>~{' '}
          <span className=''>{storeData.attributes.information.budget.highest}円</span>
        </dd>
      </dl>
      {/* facility */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>設備</dt>
        <dd className=''>
          <ul className='flex flex-row flex-wrap gap-8'>
            {storeData.attributes.information.facility.map((facility, index) => (
              <li key={index} className=''>
                <span className='text-s5LhLgLt'>#{facility.name}</span>
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
              <span className=''>月曜日</span>
              <span className=''>
                {storeData.attributes.information.businessHours.same
                  ? storeData.attributes.information.businessHours.same
                  : storeData.attributes.information.businessHours.monday}
              </span>
            </li>
            <li className=''>
              <span className=''>火曜日</span>
              <span className=''>
                {storeData.attributes.information.businessHours.same
                  ? storeData.attributes.information.businessHours.same
                  : storeData.attributes.information.businessHours.tuesday}
              </span>
            </li>
            <li className=''>
              <span className=''>水曜日</span>
              <span className=''>
                {storeData.attributes.information.businessHours.same
                  ? storeData.attributes.information.businessHours.same
                  : storeData.attributes.information.businessHours.wednesday}
              </span>
            </li>
            <li className=''>
              <span className=''>木曜日</span>
              <span className=''>
                {storeData.attributes.information.businessHours.same
                  ? storeData.attributes.information.businessHours.same
                  : storeData.attributes.information.businessHours.thursday}
              </span>
            </li>
            <li className=''>
              <span className=''>金曜日</span>
              <span className=''>
                {storeData.attributes.information.businessHours.same
                  ? storeData.attributes.information.businessHours.same
                  : storeData.attributes.information.businessHours.friday}
              </span>
            </li>
            <li className=''>
              <span className=''>土曜日</span>
              <span className=''>
                {storeData.attributes.information.businessHours.same
                  ? storeData.attributes.information.businessHours.same
                  : storeData.attributes.information.businessHours.saturday}
              </span>
            </li>
            <li className=''>
              <span className=''>日曜日</span>
              <span className=''>
                {storeData.attributes.information.businessHours.same
                  ? storeData.attributes.information.businessHours.same
                  : storeData.attributes.information.businessHours.sunday}
              </span>
            </li>
          </ul>
        </dd>
      </dl>
      {/* holiday */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>休業日</dt>
        <dd className=''>
          <span className='text-s5LhLgLt'>{storeData.attributes.information.holiday}</span>
        </dd>
      </dl>
      {/* address */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>店舗所在地</dt>
        <dd className=''>
          <a
            href={storeData.attributes.information.address.url}
            className='text-s5LhLgLt underline'
          >
            {storeData.attributes.information.address.name}
          </a>
          {/* <div className=''>{storeData.attributes.information.address.tag}</div> */}
          <div className='mt-8' dangerouslySetInnerHTML={{ __html: googleMapTag }}></div>
        </dd>
      </dl>
      {/* remarks */}
      <dl className='grid grid-cols-[1fr_60rem] pb-16 border-b border-solid border-white border-opacity-60'>
        <dt className='text-s5LhLg'>備考</dt>
        <dd className=''>
          <span className='text-s5LhLgLt'>{storeData.attributes.information.remarks}</span>
        </dd>
      </dl>
    </div>
  )
}

const StoreContentStaff = ({ staffsData }) => {
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

const StoreContentGarelly = ({ name, storeData }) => {
  console.log(storeData)
  return (
    <div className=''>
      <ul className='grid grid-cols-3 gap-x-4 gap-y-10'>
        {storeData.attributes.garelly.map((garelly, index) => (
          <li key={index}>
            <Image
              src={`http://localhost:${name}${garelly.img.data.attributes.url}`}
              width={garelly.img.data.attributes.width}
              height={garelly.img.data.attributes.height}
              alt={garelly.img.data.attributes.name}
              className='mb-4'
            />
            <span className='text-s3Lt'>{garelly.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const StoreContentCoupon = ({ name, storeData }) => {
  return (
    <ul className='grid grid-cols-3 gap-8 justify-center'>
      {storeData.attributes.coupon.map((coupon, index) => (
        <li key={index} className=''>
          {/* <Coupon coupon={coupon} /> */}
        </li>
      ))}
    </ul>
  )
}

export default function StoreDetail({
  storeData,
  staffsData,
  name,
}: {
  storeData: StrapiStore
  staffData: StrapiStaff[]
  name: string
}) {
  const [contentType, setContentType] = useState('information')
  const handleSwitchType = (switchType: string) => {
    setContentType(switchType)
  }
  return (
    <section className='w-[100rem] m-auto mt-96'>
      {/* profile */}
      <div className='grid grid-cols-[1fr_50rem]'>
        <div className='grid grid-cols-[auto_1fr] items-center gap-12'>
          <Image
            src={`http://localhost:${name}${storeData.attributes.icon.data.attributes.url}`}
            width={storeData.attributes.icon.data.attributes.width}
            height={storeData.attributes.icon.data.attributes.height}
            alt={storeData.attributes.icon.data.attributes.name}
            className='rounded-full w-60 h-60 object-cover'
          />
          <div className=''>
            <span className='text-s9'>{storeData.attributes.name}</span>
            <div className=''>
              {storeData.attributes.sns.twitter && (
                <a href={storeData.attributes.sns.twitter} className=''>
                  twitter
                </a>
              )}
              {storeData.attributes.sns.instagram && (
                <a href={storeData.attributes.sns.instagram} className=''>
                  instagram
                </a>
              )}
              {storeData.attributes.sns.tiktok && (
                <a href={storeData.attributes.sns.tiktok} className=''>
                  tiktok
                </a>
              )}
              {storeData.attributes.sns.other && (
                <a href={storeData.attributes.sns.other} className=''>
                  other
                </a>
              )}
            </div>
          </div>
        </div>
        <div className='mt-24'>
          <p className='text-s5LhLgLt'>{storeData.attributes.description}</p>
        </div>
      </div>
      {/* datas */}
      <div className='mt-32 '>
        {/* tab */}
        <nav className='border-b border-solid border-white border-opacity-60'>
          <ul className='grid grid-cols-4'>
            <li className=''>
              <button
                onClick={() => handleSwitchType('information')}
                className='w-full p-10 text-s6'
              >
                店舗情報
              </button>
            </li>
            <li className=''>
              <button onClick={() => handleSwitchType('staff')} className='w-full p-10 text-s6'>
                スタッフ
              </button>
            </li>
            <li className=''>
              <button onClick={() => handleSwitchType('garelly')} className='w-full p-10 text-s6'>
                ギャラリー
              </button>
            </li>
            <li className=''>
              <button onClick={() => handleSwitchType('coupon')} className='w-full p-10 text-s6'>
                クーポン
              </button>
            </li>
          </ul>
        </nav>
        {/* content */}
        <div className='w-layoutSm m-auto mt-32'>
          <StoreContent
            name={name}
            contentType={contentType}
            storeData={storeData}
            staffsData={staffsData}
          />
        </div>
      </div>
    </section>
  )
}
