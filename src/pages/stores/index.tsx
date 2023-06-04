import Tag from '@/components/common/Tag'
import Store from '@/components/item/Store'
import Layout from '@/components/layout/Layout'
import { BUDGETS, REGIONS } from '@/constants/strapi'
import { StrapiStore } from '@/type/strapi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

// export const getStaticProps = async ({ query }) => {
export const getServerSideProps = async ({ query }) => {
  const res = await fetch('http://localhost:3000/api/strapi/getAllStores')
  let stores: StrapiStore[] = await res.json()

  if (query.area) {
    stores = stores.filter((store) => store.region?.prefectures === query.area)
  }
  if (query.budgetMin) {
    stores = stores.filter(
      (store) => store.attributes.information?.budget?.lowest >= query.budgetMin,
    )
  }
  if (query.budgetMax) {
    stores = stores.filter(
      (store) => store.attributes.information?.budget?.highest <= query.budgetMax,
    )
  }

  return {
    props: {
      stores,
    },
  }
}

export default function Stores({ stores }: { stores: StrapiStore[] }) {
  const router = useRouter()
  const { query } = router

  const handleSelectArea = (e) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, area: e.target.value },
    })
  }

  const handleSelectBudgetMin = (e) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, budgetMin: e.target.value },
    })
  }

  const handleSelectBudgetMax = (e) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, budgetMax: e.target.value },
    })
  }

  // console.log(query)

  const handleRemoveQuery = (queryItem, query) => {
    console.log(queryItem, query)
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        area: queryItem === queryItem ? '' : queryItem,
        budgetMin: queryItem === queryItem ? '' : queryItem,
        budgetMax: queryItem === queryItem ? '' : queryItem,
      },
    })
  }

  return (
    <Layout>
      <section className='w-layoutMd m-auto mt-36'>
        <h1 className='relative flex items-end gap-6 mb-24 pl-10 before:content-[""] before:absolute before:top-6 before:left-0 before:inline-block before:w-4 before:h-4 before:bg-green before:rounded-full'>
          <span className='text-s9'>店舗</span>
          <span className='text-s7'>【{stores.length}】</span>
        </h1>
        {/* エリアを選択した場合に指定したエリアを表示してクリックすると削除する */}
        {query.area && <Tag onClick={() => handleRemoveQuery(query.area, query)}>{query.area}</Tag>}
        {/* 予算を選択した場合に指定した予算を表示してクリックすると削除する */}
        {/* {query.budgetMin && (
          <button onClick={() => handleRemoveQuery(query.budgetMin, query)}>
            <span className='text-s6'>下限予算:{query.budgetMin}円</span>
          </button>
        )} */}
        {/* 予算を選択した場合に指定した予算を表示してクリックすると削除する */}
        <div className='grid grid-cols-[20rem_1fr] content-between gap-24'>
          {/* side */}
          <div className='flex flex-col gap-20'>
            {/* budget */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>予算</span>
              <div className=''>
                <select
                  name='budgetMin'
                  id='budgetMin'
                  onChange={handleSelectBudgetMin}
                  className='w-full px-6 py-4 text-black text-s3'
                  value={query.budgetMin}
                >
                  <option value=''>下限なし</option>
                  {BUDGETS.map((budget, index) => (
                    <option key={index} value={budget.price}>
                      {budget.price.toLocaleString()}円
                    </option>
                  ))}
                </select>
                <span className=''>〜</span>
                <select
                  name='budgetMax'
                  id='budgetMax'
                  onChange={handleSelectBudgetMax}
                  className='w-full px-6 py-4 text-black text-s3'
                  value={query.budgetMax}
                >
                  <option value=''>上限なし</option>
                  {BUDGETS.map((budget, index) => (
                    <option key={index} value={budget.price}>
                      {budget.price.toLocaleString()}円
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* area */}
            <div className=''>
              <span className='block w-full px-6 py-4 text-s6 bg-blackWeak rounded-md'>エリア</span>
              <div className='mt-8'>
                <select
                  name='area'
                  id='area'
                  onChange={handleSelectArea}
                  value={query.area}
                  className='w-full px-6 py-4 text-black text-s3'
                >
                  <option value=''>エリアを選択する</option>
                  {REGIONS.map((region, index) => (
                    <option key={index} value={region.prefectures}>
                      {region.prefectures}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* facility */}
            {/* <div className=''>
            <ul className=''>
              <li className=''></li>
            </ul>
          </div> */}
            <Link href='/stores/'>条件をクリアする</Link>
          </div>
          {/* main */}
          <div className='w-layoutSm'>
            <ul className='grid grid-cols-3 gap-4'>
              {stores.map((store, index) => (
                <li key={index} className=''>
                  <Store store={store} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}
