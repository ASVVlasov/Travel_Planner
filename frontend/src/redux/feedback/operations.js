import { fetchRequest } from '../fetch/operations'

import { feedbackSuccess, feedbackError } from './actions'

export const sendFeedback = (comment) =>
   fetchRequest.post('/feedback', [feedbackSuccess, feedbackError], comment)
