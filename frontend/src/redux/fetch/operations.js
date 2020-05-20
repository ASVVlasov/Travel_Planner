import { isLoading, hadError } from '../fetch/actions'

export const fetchRequest = {
   get: (url, action) => fetchData(url, action),

   post: (url, action, body) =>
      fetchData(url, action, JSON.stringify(body), 'POST'),

   put: (url, action, body) =>
      fetchData(url, action, JSON.stringify(body), 'PUT'),

   delete: (url, action, body) =>
      fetchData(url, action, JSON.stringify(body), 'DELETE'),

   uploadFile: (url, action, body) => fetchData(url, action, body, 'POST', {}),
}

const fetchData = (url, action, body, method, headers) => async (dispatch) => {
   dispatch(isLoading())

   try {
      const res = await fetch(url, {
         method,
         headers: headers || {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body,
      })
      if (!res.ok) {
         throw new Error(res.statusText)
      }
      const data = await res.json()
      dispatch(action(data))
   } catch (error) {
      dispatch(hadError(error))
   }
}
