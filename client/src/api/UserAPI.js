import { useState, useEffect } from 'react'
import axios from 'axios'

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        setIsLoading(true)
        try {
          const res = await axios.get('/user/info', {
            headers: { Authorization: token },
          })

          setIsLogged(true)
          res.data.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
          setIsLoading(false)

          setCart(res.data.cart)
        } catch (err) {
          alert(err.response.data.msg)
        }
      }
      getUser()
    }
  }, [token])

  const addCart = async (product) => {
    if (!isLogged) {
      return alert('Please login to buy')
    }

    const check = cart.every((item) => {
      return item._id !== product._id
    })

    if (check) {
      setIsLoading(true)

      setCart([...cart, { ...product, quantity: 1 }])

      await axios.patch(
        '/user/addcart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      )

      setIsLoading(false)
    } else {
      alert('The product has already been added')
    }
  }

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    isLoading: [isLoading, setIsLoading],
  }
}
export default UserAPI
