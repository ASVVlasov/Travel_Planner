import { getSummarySuccess } from './actions'

import { fetchRequest } from '../fetch/operations'

export const getSummary = (travelId) =>
   fetchRequest.get('/card/payer/summary/' + travelId, getSummarySuccess)
