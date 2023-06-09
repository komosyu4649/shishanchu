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
      prefectures: '千葉県',
      city: '都賀',
    },
    jwt: process.env.STRAPI_JWT_STORETEMPLATE2,
  },
]

export const CAREERS = [{ year: 1 }, { year: 3 }, { year: 5 }, { year: 7 }, { year: 10 }]

export const BUDGETS = [
  { price: 2000 },
  { price: 4000 },
  { price: 6000 },
  { price: 8000 },
  { price: 10000 },
]

export const REGIONS = [
  // 北海道地方
  { prefectures: '北海道' },

  // 東北地方
  { prefectures: '青森県' },
  { prefectures: '岩手県' },
  { prefectures: '宮城県' },
  { prefectures: '秋田県' },
  { prefectures: '山形県' },
  { prefectures: '福島県' },

  // 関東地方
  { prefectures: '茨城県' },
  { prefectures: '栃木県' },
  { prefectures: '群馬県' },
  { prefectures: '埼玉県' },
  { prefectures: '千葉県' },
  { prefectures: '東京都' },
  { prefectures: '神奈川県' },

  // 中部地方
  { prefectures: '新潟県' },
  { prefectures: '富山県' },
  { prefectures: '石川県' },
  { prefectures: '福井県' },
  { prefectures: '山梨県' },
  { prefectures: '長野県' },
  { prefectures: '岐阜県' },
  { prefectures: '静岡県' },
  { prefectures: '愛知県' },

  // 近畿地方
  { prefectures: '三重県' },
  { prefectures: '滋賀県' },
  { prefectures: '京都府' },
  { prefectures: '大阪府' },
  { prefectures: '兵庫県' },
  { prefectures: '奈良県' },
  { prefectures: '和歌山県' },

  // 中国地方
  { prefectures: '鳥取県' },
  { prefectures: '島根県' },
  { prefectures: '岡山県' },
  { prefectures: '広島県' },
  { prefectures: '山口県' },

  // 四国地方
  { prefectures: '徳島県' },
  { prefectures: '香川県' },
  { prefectures: '愛媛県' },
  { prefectures: '高知県' },

  // 九州地方（沖縄を含む）
  { prefectures: '福岡県' },
  { prefectures: '佐賀県' },
  { prefectures: '長崎県' },
  { prefectures: '熊本県' },
  { prefectures: '大分県' },
  { prefectures: '宮崎県' },
  { prefectures: '鹿児島県' },
  { prefectures: '沖縄県' },
]
