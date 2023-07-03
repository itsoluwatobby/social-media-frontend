import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authUsers } from '../api/axiosFetch'
import useContextAuth from '../UserContext/useContextAuth'

export const useRefreshToken = () => {
  const {setUsers} = useContextAuth()

  const refresh = async() => {
      const res = await authUsers.get('/refresh', {
        withCredentials: true
      })
      setUsers(prev =>{ 
        return {...prev, accessToken: res?.data}
      })
      return res?.data
  }

  return refresh
}
