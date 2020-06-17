import { hadError } from '../fetch/actions'
import { authError } from '../auth/actions'
import { push } from 'connected-react-router'

export const fetchRequest = {
   get: (url, actions) => fetchData(url, actions),

   post: (url, actions, body) =>
      fetchData(url, actions, JSON.stringify(body), 'POST'),

   put: (url, actions, body) =>
      fetchData(url, actions, JSON.stringify(body), 'PUT'),

   delete: (url, actions, body) =>
      fetchData(url, actions, JSON.stringify(body), 'DELETE'),

   uploadFile: (url, actions, body) =>
      fetchData(url, actions, body, 'POST', {}),
}

const fetchData = (url, actions, body, method, headers) => async (dispatch) => {
   const [loadingAction, successAction, errorAction] = actions

   if (loadingAction) {
      dispatch(loadingAction())
   }

   try {
      const res = await fetch(url, {
         method,
         headers: headers || {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body,
      })
      if (!res.ok) {
         if (res.status === 401 || res.status === 403) {
            dispatch(authError())
         } else if (res.status === 404) {
            dispatch(push('/404'))
         } else {
            const error = await res.json()
            throw error
         }
      }
      const data = await res.json()
      dispatch(successAction(data))
   } catch (error) {
      errorAction ? dispatch(errorAction(error)) : dispatch(hadError(error))
   }
}
