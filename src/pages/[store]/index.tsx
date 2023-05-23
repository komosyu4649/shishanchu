import { ACCOUNTS } from '@/constants/strapi'
import { StrapiStore } from '@/type/strapi'
import axios from 'axios'
import Image from 'next/image'

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
  // console.log(accuntData)
  const stores = await axios.get(
    `http://localhost:${accuntData?.name}/api/stores/1?populate=icon,sns,information.system,information.budget,information.facility,information.businessHours,information.address,garelly`,
    {
      headers: {
        Authorization: `Bearer ${accuntData?.jwt}`,
      },
    },
  )
  const storeData = stores.data.data

  return {
    props: {
      storeData,
      name: accuntData?.name,
    },
  }
}

export default function StoreDetail({ storeData, name }: { storeData: StrapiStore; name: string }) {
  // console.log(storeData.attributes.information)
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
        <nav className='border-b-2 border-solid border-white border-opacity-60'>
          <ul className='grid grid-cols-4'>
            <li className=''>
              <button className='w-full p-10 text-s6'>店舗情報</button>
            </li>
            <li className=''>
              <button className='w-full p-10 text-s6'>スタッフ</button>
            </li>
            <li className=''>
              <button className='w-full p-10 text-s6'>ギャラリー</button>
            </li>
            <li className=''>
              <button className='w-full p-10 text-s6'>クーポン</button>
            </li>
          </ul>
        </nav>
        {/* content */}
        <div className=''>
          {/* system */}
          <dl className=''>
            <dt className=''>システム</dt>
            <dd className=''>
              <ul className=''>
                <li className=''>
                  <span className=''>チャージ料</span>
                  <span className=''>{storeData.attributes.information.system.chargeFee}</span>
                </li>
                <li className=''>
                  <span className=''> シーシャ代</span>
                  <span className=''>{storeData.attributes.information.system.shishaFee}</span>
                </li>
                <li className=''>
                  <span className=''>ワンドリンク制</span>
                  <span className=''>{storeData.attributes.information.system.oneDrinkSystem}</span>
                </li>
                <li className=''>
                  <span className=''>オプション</span>
                  <span className=''>{storeData.attributes.information.system.options}</span>
                </li>
              </ul>
            </dd>
          </dl>
          {/* budget */}
          <dl className=''>
            <dt className=''>予算</dt>
            <dd className=''>
              <span className=''>{storeData.attributes.information.budget.lowest}円 </span>~{' '}
              <span className=''>{storeData.attributes.information.budget.highest}円</span>
            </dd>
          </dl>
          {/* facility */}
          <dl className=''>
            <dt className=''>設備</dt>
            <dd className=''>
              <ul className=''>
                {storeData.attributes.information.facility.map((facility, index) => (
                  <li key={index} className=''>
                    <span className=''>{facility.name}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          {/* businessHours */}
          <dl className=''>
            <dt className=''>営業時間</dt>
            <dd className=''>
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
        </div>
      </div>
    </section>
  )
}
