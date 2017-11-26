import axios from 'axios'

export const getEcosystem = () => axios('/api/world')
export const getContacts = () => axios('/api/contacts')
