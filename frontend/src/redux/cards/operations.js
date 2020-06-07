import {
   createCardSuccess,
   changeCardSuccess,
   deleteCardSuccess,
} from './actions'
import { fetchRequest } from '../fetch/operations'

const MAIN_URL = '/card'
const FILE_URL = MAIN_URL + '/file'
const PAYER_URL = MAIN_URL + '/payer'

export const createCard = (card) =>
   fetchRequest.post(MAIN_URL, [createCardSuccess], card)

export const changeCard = (card) =>
   fetchRequest.put(MAIN_URL, [changeCardSuccess], card)

export const deleteCard = (cardId) =>
   fetchRequest.delete(`${MAIN_URL}/${cardId}`, [deleteCardSuccess])

export const uploadFile = (file) =>
   fetchRequest.uploadFile(FILE_URL, [changeCardSuccess], file)

export const deleteFile = (file) =>
   fetchRequest.delete(FILE_URL, [changeCardSuccess], file)

export const addPayer = (payer) =>
   fetchRequest.post(PAYER_URL, [changeCardSuccess], payer)

export const changePayerStatus = (payer) =>
   fetchRequest.put(PAYER_URL, [changeCardSuccess], payer)

export const deletePayer = (payer) =>
   fetchRequest.delete(PAYER_URL, [changeCardSuccess], payer)
