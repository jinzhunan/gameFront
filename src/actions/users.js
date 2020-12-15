import { SET_USERS, EDIT_USERS, CLEAR_USERS } from '../constants/actionTypes';
import axios from 'axios'

import {backEndProURL, frontEndProURL} from '../api/ApiData'
import {clearMessage, setMessage} from './messages'


export const setUsers = (jwt) => async (dispatch) => {
  try {
    const {data} = await axios.get(`${backEndProURL}/users/me`,{
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
      console.log(data)
    dispatch({ type: SET_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleJwt = (googleIdToken) => async (dispatch) =>{
    // signIn with Google
      try {
        var userData =  await axios.get(`${backEndProURL}/auth/google/callback?id_token=${googleIdToken}`)
        // set localstorage
        localStorage.setItem('jwt', userData.data.jwt)
        console.log(userData.data
          )
        dispatch({ type: SET_USERS, payload: userData.data });
      } catch (error) {
        console.log(error)
      }
}

export const clearUsers = () => (dispatch) =>{
  localStorage.clear()
  window.location.href = frontEndProURL
  dispatch({type: CLEAR_USERS})
}

export const handleUpdateUser = (user) => async (dispatch) =>{
  console.log('user')
  console.log(user)
  try {
      const data = await axios.put(`${backEndProURL}/users/${user.userId}`,{
          "username": user.userName
          },{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
          console.log('1233')
          console.log(data)
          dispatch({type: EDIT_USERS, payload: data})

          const succedMsg = {'message': 'profile changed'}
          dispatch(setMessage(succedMsg))
          dispatch(clearMessage())
  } catch (error) {
    console.log(error)

  }
}

export const handleUpdateLevel =  (user,roleId) => async (dispatch) => {
  try {
    const {data} = await axios.put(`${backEndProURL}/users/${user.userId}`,{
          "role": roleId
      },{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
      // getUser()
      dispatch({type: EDIT_USERS, payload: data})

      const succedMsg = {'message': 'level changed'}
      dispatch(setMessage(succedMsg))
      dispatch(clearMessage())
  } catch (error) {
    console.log(error)
  }
}

export const handleResetPassword =  (password) => async (dispatch) => {
  const currentCode = window.location.href.split('code=')[1]
  try {
      const newData = await axios.post(`${backEndProURL}/auth/reset-password`, {
          "password": password,
          "passwordConfirmation": password,
          "code": currentCode
        });
        
        // set localstorage
        localStorage.setItem('jwt', newData.data.jwt)
        
        window.location.href = frontEndProURL

  } catch (error) {

    const errorMsg = {'error': error.response.data.message[0].messages[0].message}
    dispatch(setMessage(errorMsg))
    dispatch(clearMessage())  }

}

export const handleSendEmail = (email) =>async (dispatch) =>{
  try {
      await axios.post(`${backEndProURL}/auth/forgot-password`, {
          email: email
        });
      const errorMsg = {'message': 'pleace check email'}
      dispatch(setMessage(errorMsg))
      dispatch(clearMessage())
  } catch (error) {
      const errorMsg = {'error': error.response.data.message[0].messages[0].message}
      dispatch(setMessage(errorMsg))
      dispatch(clearMessage())
  }
}

export const handleLocalLogIn =  (userEmail, password) => async (dispatch) => {
  try {
      const {data} = await axios.post(`${backEndProURL}/auth/local`, {
      identifier: userEmail,
      password: password
      });

      // set localstorage
      localStorage.setItem('jwt', data.jwt)

      window.location.href = frontEndProURL
  } catch (error) {
    const errorMsg = {'error': 'wrong password or email'}
    dispatch(setMessage(errorMsg))
    dispatch(clearMessage())

  }
}

export const handleSignUp = (userName, userEmail, password) => async (dispatch) =>{
  try {
      const {data} = await axios.post(`${backEndProURL}/auth/local/register`, {
          username: userName,
          email: userEmail,
          password: password
      });

      // set localstorage
      localStorage.setItem('jwt', data.jwt)

      window.location.href = frontEndProURL
  } catch (error) {

      const errorMsg = {'error': error.response.data.message[0].messages[0].message}
      dispatch(setMessage(errorMsg))
      dispatch(clearMessage())
  }

}


