// CMS
export const MICROCMS_ENDPOINT_CMS_FEATURES = 'features'
export const MICROCMS_ENDPOINT_CMS_FEATURE_CATEGORIES = 'feature_categories'

// STORE
export const MICROCMS_ENDPOINT_STORE_STORE = 'store'
export const MICROCMS_ENDPOINT_STORE_STAFFS = 'staffs'
export const MICROCMS_ENDPOINT_STORE_CONTENTS = 'contents'

export const ACCOUNTS = [
  {
    name: process.env.MICROCMS_SERVICE_DOMAIN_STORE_1 ?? '',
    store: process.env.MICROCMS_SERVICE_STORE_NAME_1 ?? '',
    key: process.env.MICROCMS_API_KEY_STORE_1 ?? '',
  },
  {
    name: process.env.MICROCMS_SERVICE_DOMAIN_STORE_2 ?? '',
    store: process.env.MICROCMS_SERVICE_STORE_NAME_2 ?? '',
    key: process.env.MICROCMS_API_KEY_STORE_2 ?? '',
  },
]

export const GENDERS = [
  {
    label: '指定なし',
  },
  {
    label: '男性',
  },
  {
    label: '女性',
  },
]

export const CAREERS = [{ year: 1 }, { year: 3 }, { year: 5 }, { year: 7 }, { year: 10 }]

export const PAGE_SIZE = 2
