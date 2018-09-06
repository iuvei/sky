import { createAPI } from '../util'
import config from '../config'

const baseUrl = {
  mock: 'https://www.easy-mock.com/mock/5a34e96cb3739f4feec6e961/ladyboy',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock']

export default createAPI(baseUrl)