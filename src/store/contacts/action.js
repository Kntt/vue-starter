import { getContacts } from '../../services'
import { UPDATE_CONTACTS } from './types'

export default {
  async getContacts ({commit, store}) {
    let { data } = await getContacts()
    commit(UPDATE_CONTACTS, {val: data.body})
  }
}
