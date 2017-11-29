import ActionSheet from './action-sheet.vue'
import createAPI from '../common/js/create-api'

const addActionSheet = (Vue, ActionSheet) => {
  createAPI(Vue, ActionSheet, ['select', 'cancel'], true)
}

ActionSheet.install = function (Vue) {
  Vue.component(ActionSheet.name, ActionSheet)
  addActionSheet(Vue, ActionSheet)
}

export default ActionSheet
