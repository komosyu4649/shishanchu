// TODO: 店舗絞り込みの時の地域とかの登録もここでおこなうかも？
export const ACCOUNTS = [
  {
    name: '1337',
    store: '1496',
    region: {
      prefectures: '東京都',
      city: '渋谷区',
    },
    jwt: process.env.STRAPI_JWT_STORETEMPLATE,
  },
  {
    name: '1338',
    store: 'c.stand 渋谷',
    region: {
      prefectures: '東京都',
      city: '渋谷区',
    },
    jwt: process.env.STRAPI_JWT_STORETEMPLATE2,
  },
]

export const CAREERS = [{ year: 1 }, { year: 3 }, { year: 5 }, { year: 7 }, { year: 10 }]
