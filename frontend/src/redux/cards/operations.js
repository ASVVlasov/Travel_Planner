import {
   createCardSuccess,
   changeCardSuccess,
   deleteCardSuccess,
   hadError,
} from './actions'

export const createCard = (card) => async (dispatch) => {
   try {
      const res = await fetch(`/card/`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify(card),
      })

      if (!res.ok) {
         throw new Error(res.statusText)
      }

      const newCard = await res.json()
      dispatch(createCardSuccess(newCard))
   } catch (err) {
      dispatch(hadError(err))
   }
}

export const changeCard = (card) => async (dispatch) => {
   try {
      const res = await fetch('/card/', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify(card),
      })

      if (!res.ok) {
         throw new Error(res.statusText)
      }

      const updCard = await res.json()
      dispatch(changeCardSuccess(updCard))
   } catch (err) {
      dispatch(hadError(err))
   }
}

export const deleteCard = (cardId) => async (dispatch) => {
   try {
      const res = await fetch(`/card/${cardId}`, {
         method: 'DELETE',
      })

      if (!res.ok) {
         throw new Error(res.statusText)
      }

      dispatch(deleteCardSuccess(cardId))
   } catch (err) {
      dispatch(hadError(err))
   }
}
