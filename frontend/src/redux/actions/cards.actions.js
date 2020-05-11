import { CARDS_LOADING, CARDS_SUCCESS, CARDS_ERROR } from './types'

export const getCards = (categoryType, travelId) => {
   return (dispatch) => {
      dispatch(getCardsLoading())

      fetch(`/travel/${categoryType}/${travelId}`)
         .then((res) => res.json())
         .then(
            (data) => dispatch(getCardsSuccess(data)),
            (err) => dispatch(getCardsError(err))
         )
         .catch((err) => dispatch(getCardsError(err)))
   }
}

const getCardsLoading = () => ({
   type: CARDS_LOADING,
})

const getCardsSuccess = (data) => ({
   type: CARDS_SUCCESS,
   payload: { ...data },
})

const getCardsError = (err) => ({
   type: CARDS_ERROR,
   payload: { err },
})
