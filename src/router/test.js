// import success from '~/views/public/registe/components/success'
// 为方便进入页面， 上线前会删除  -kn
const test = () => import('~/views/huiYuan/testApi')
export default [
  {
    path: '/test',
    name: 'test',
    component: test
  }
]
