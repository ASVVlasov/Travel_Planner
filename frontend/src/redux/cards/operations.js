import {
   createCardSuccess,
   changeCardSuccess,
   deleteCardSuccess,
} from './actions'

import { fetchRequest } from '../fetch/operations'

export const createCard = (card) =>
   // fetchRequest('POST', '/card/', createCardSuccess, JSON.stringify(card))
   fetchRequest.post('/card/', createCardSuccess, card)

export const changeCard = (card) =>
   // fetchRequest('PUT', '/card/', changeCardSuccess, JSON.stringify(card))
   fetchRequest.put('/card/', changeCardSuccess, card)

export const deleteCard = (cardId) =>
   // fetchRequest('DELETE', `/card/${cardId}`, deleteCardSuccess)
   fetchRequest.delete(`/card/${cardId}`, deleteCardSuccess)

export const uploadFile = (file) =>
   // fetchRequest('POST', '/card/uploadFile', changeCardSuccess, file, {})
   fetchRequest.uploadFile('/card/uploadFile', changeCardSuccess, file)
