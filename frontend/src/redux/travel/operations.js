import { fetchRequest } from '../fetch/operations'

import {
   getBudgetLoading,
   getBudgetSuccess,
   getBudgetError,
   getTravelLoading,
   getTravelSuccess,
   getTravelError,
   changeTravelLoading,
   changeTravelSuccess,
   changeTravelError,
   createTravelLoading,
   createTravelSuccess,
   createTravelError,
   deleteTravelLoading,
   deleteTravelSuccess,
   deleteTravelError,
} from './actions'

const MAIN_URL = '/travel/'

export const getBudget = (travelId) =>
   fetchRequest.get('/card/payer/summary/' + travelId, [
      getBudgetLoading,
      getBudgetSuccess,
      getBudgetError,
   ])

export const getTravel = (travelId) =>
   fetchRequest.get(MAIN_URL + travelId, [
      getTravelLoading,
      getTravelSuccess,
      getTravelError,
   ])

export const changeTravel = (title) =>
   fetchRequest.put(
      MAIN_URL,
      [changeTravelLoading, changeTravelSuccess, changeTravelError],
      title
   )

export const createTravel = (travelData) =>
   fetchRequest.post(
      MAIN_URL,
      [createTravelLoading, createTravelSuccess, createTravelError],
      travelData
   )

export const addTraveler = (traveler) =>
   fetchRequest.post(
      '/travel/user',
      [changeTravelLoading, changeTravelSuccess, changeTravelError],
      traveler
   )

export const deleteTraveler = (traveler) =>
   fetchRequest.delete(
      '/travel/user',
      [changeTravelLoading, changeTravelSuccess, changeTravelError],
      traveler
   )

export const changeStatusTravel = (travel) =>
   fetchRequest.put(
      MAIN_URL,
      [changeTravelLoading, changeTravelSuccess, changeTravelError],
      travel
   )

export const deleteTravel = (travelId) =>
   fetchRequest.delete(`${MAIN_URL}${travelId}`, [
      deleteTravelLoading,
      deleteTravelSuccess,
      deleteTravelError,
   ])
