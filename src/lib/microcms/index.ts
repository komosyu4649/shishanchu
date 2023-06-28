import { createClient } from 'microcms-js-sdk'

export const cmsClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN_CMS ?? '',
  apiKey: process.env.MICROCMS_API_KEY_CMS ?? '',
})
