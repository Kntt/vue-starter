import { camelize } from '../lang/string'
import createAPIComponent from './create-api-component'

export default function createAPI (Vue, Component, events, single) {
  const api = createAPIComponent.apply(this, arguments)
  const name = Component.name.replace(/^f-/i, '')
  const createName = `$${camelize(`create-${name}`)}`
  Vue.prototype[createName] = api.create
  return api
}
