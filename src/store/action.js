import { getEcosystem } from '../services'
import { ADD_ECOSYSTEM } from './types'

export default {
  async getEcosystem ({commit, store}) {
    let { data } = await getEcosystem()
    commit(ADD_ECOSYSTEM, data.body)
  }
}
