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
    key: process.env.MICROCMS_API_KEY_STORE_1 ?? '',
  },
  {
    name: process.env.MICROCMS_SERVICE_DOMAIN_STORE_2 ?? '',
    key: process.env.MICROCMS_API_KEY_STORE_2 ?? '',
  },
]
