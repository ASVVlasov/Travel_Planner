import {
   createCardSuccess,
   changeCardSuccess,
   deleteCardSuccess,
   hadError,
} from './actions'

export const createCard = (travelId, card) => async (dispatch) => {
   try {
      const res = await fetch(`card/${travelId}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify({ ...card }),
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

export const changeCard = (travelId, card) => async (dispatch) => {
   try {
      const res = await fetch('/card/', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify({ travelId, card }),
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

export const deleteCard = (travelId, cardId) => async (dispatch) => {
   try {
      const res = await fetch(`/card/${travelId}/${cardId}`, {
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