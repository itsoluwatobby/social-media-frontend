import { useEffect } from "react";
import { axiosPrivate } from "../api/axiosFetch";
import { UserContext } from "../UserContext/UserContext";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {users} = UserContext();

  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if(!config?.headers['authorization']){
          config?.headers['authorization'] = `Bearer ${users?.accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if(error?.response?.status === 403 && !prevRequest.sent){
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [refresh, users])

  return axiosPrivate
}

