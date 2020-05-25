import {
   GET_BOARD_FILTER,
   GET_BOARD_SUCCESS,
   SET_TAB_FILTER,
   SET_USER_FILTER,
   SET_HISTORY_FILTER,
} from '../types'

export const getBoardSuccess = (tabs) => ({
   type: GET_BOARD_SUCCESS,
   payload: tabs,
})

export const getBoardFilter = () => ({
   type: GET_BOARD_FILTER,
})

export const setUserFilter = (userId) => ({
   type: SET_USER_FILTER,
   payload: userId,
})

export const setTabFilter = (tabId) => ({
   type: SET_TAB_FILTER,
   payload: tabId,
})

export const setHistoryFilter = (bool) => ({
   type: SET_HISTORY_FILTER,
   payload: bool,
})
