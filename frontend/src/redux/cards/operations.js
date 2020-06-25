import {
   createCardLoading,
   createCardSuccess,
   createCardError,
   changeCardLoading,
   changeCardSuccess,
   changeCardError,
   deleteCardSuccess,
   deleteCardError,
   cardFileError,
   cardFileLoading,
   addPayerLoading,
   addPayerError,
   deletePayerLoading,
   deletePayerError,
   setPayerLoading,
   setPayerError,
} from './actions'
import { fetchRequest } from '../fetch/operations'

const MAIN_URL = '/card'
const FILE_URL = MAIN_URL + '/file'
const PAYER_URL = MAIN_URL + '/payer'

export const createCard = (card) =>
   fetchRequest.post(
      MAIN_URL,
      [createCardLoading, createCardSuccess, createCardError],
      card
   )

export const changeCard = (card) =>
   fetchRequest.put(
      MAIN_URL,
      [changeCardLoading, changeCardSuccess, changeCardError],
      card
   )

export const deleteCard = (cardId) =>
   fetchRequest.delete(`${MAIN_URL}/${cardId}`, [
      null,
      deleteCardSuccess,
      deleteCardError,
   ])

export const uploadFile = (file) =>
   fetchRequest.uploadFile(
      FILE_URL,
      [cardFileLoading, changeCardSuccess, cardFileError],
      file
   )

export const deleteFile = (file) =>
   fetchRequest.delete(
      FILE_URL,
      [cardFileLoading, changeCardSuccess, cardFileError],
      file
   )

export const addPayer = (payer) =>
   fetchRequest.post(
      PAYER_URL,
      [addPayerLoading, changeCardSuccess, addPayerError],
      payer
   )

export const changePayerStatus = (payer) =>
   fetchRequest.put(
      PAYER_URL,
      [setPayerLoading, changeCardSuccess, setPayerError],
      payer
   )

export const deletePayer = (payer) =>
   fetchRequest.delete(
      PAYER_URL,
      [deletePayerLoading, changeCardSuccess, deletePayerError],
      payer
   )
