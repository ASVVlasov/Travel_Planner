import { GET_CARDS } from './types'

export const getCards = (activeTabId) => {
   return (dispatch) => dispatch(getCardsList(activeTabId))
}

const getCardsList = (activeTabId) => ({
   type: GET_CARDS,
   payload: { activeTabId },
})
