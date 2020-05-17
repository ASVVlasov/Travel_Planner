import {
   createCardSuccess,
   changeCardSuccess,
   deleteCardSuccess,
} from './actions'

import { fetchRequest } from '../fetch/operations'

export const createCard = (card) =>
   fetchRequest('POST', '/card/', createCardSuccess, JSON.stringify(card))

export const changeCard = (card) =>
   fetchRequest('PUT', '/card/', changeCardSuccess, JSON.stringify(card))

export const deleteCard = (cardId) =>
   fetchRequest('DELETE', `/card/${cardId}`, deleteCardSuccess)
