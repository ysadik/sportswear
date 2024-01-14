import { createContext, useContext, useEffect, useState } from 'react'
import ProductsAPI from './api/ProductsAPI'
import CategoriesAPI from './api/CategoriesAPI'
import UserAPI from './api/UserAPI'
import axios from 'axios'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

export const AppContext = ({ children }) => {
  const [token, setToken] = useState(false)

  const getToken = async () => {
    try {
      const res = await axios.get('/user/refresh_token')
      setToken(res.data.token)
    } catch (err) {
      console.log(err.response.data.msg)
    }
  }

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')

    if (firstLogin) {
      const refreshToken = () => {
        getToken()
        setTimeout(() => {
          refreshToken()
        }, 10 * 60 * 1000)
      }
      refreshToken()
    }
  }, [])

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    categoriesAPI: CategoriesAPI(),
    userAPI: UserAPI(token),
  }

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  )
}
