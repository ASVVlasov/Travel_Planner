import { history } from '../store'

export const authorization = (authInfo, path) => async (dispatch) => {
   console.log(authInfo)
   const res = await fetch(path, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(authInfo),
   })
   if (!res.ok) {
      throw new Error(res.statusText)
   } else {
      history.push('/profile/travels')
   }
}
