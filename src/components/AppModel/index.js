import AppModel from './AppModel'
// console.log(AppModel)
AppModel.install = Vue => {
  Vue.component(AppModel.name, AppModel)
}
export default AppModel
