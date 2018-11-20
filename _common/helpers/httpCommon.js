import axios from 'axios'
import { appLogger } from '@/_common/helpers/appLogger'
import * as appSettings from '@/_common/appSettings'
const BASE_URL = appSettings.BASE_URL


export default {
  getHttpClient () {
    const HTTP = axios.create({
      headers: {},
      baseURL: BASE_URL,
      data: {}
    })
    return HTTP
  },
}
