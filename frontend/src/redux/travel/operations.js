import { fetchRequest } from '../fetch/operations'

import {
   getBudgetSuccess,
   getTravelSuccess,
   changeTravelSuccess,
   createTravelSuccess,
   deleteTravelSuccess,
} from './actions'

const MAIN_URL = '/travel/'

export const getBudget = (travelId) =>
   fetchRequest.get('/card/payer/summary/' + travelId, [getBudgetSuccess])

export const getTravel = (travelId) =>
   fetchRequest.get(MAIN_URL + travelId, [getTravelSuccess])

export const changeTravel = (title) =>
   fetchRequest.put(MAIN_URL, [changeTravelSuccess], title)

export const createTravel = (travelData) =>
   fetchRequest.post(MAIN_URL, [createTravelSuccess], travelData)

export const addTraveler = (traveler) =>
   fetchRequest.post('/travel/user', [changeTravelSuccess], traveler)

export const deleteTraveler = (traveler) =>
   fetchRequest.delete('/travel/user', [changeTravelSuccess], traveler)

export const changeStatusTravel = (travel) =>
   fetchRequest.put(MAIN_URL, [changeTravelSuccess], travel)

export const deleteTravel = (travelId) =>
   fetchRequest.delete(`${MAIN_URL}${travelId}`, [deleteTravelSuccess])
