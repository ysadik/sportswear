import { useState, useEffect } from 'react'
import axios from 'axios'

const CategoriesAPI = () => {
  const [categories, setCategories] = useState([])
  const [callback, setCallback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true)
      const res = await axios.get('/api/category')
      setCategories(res.data)
      setIsLoading(false)
    }
    getCategories()
  }, [callback])

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
    isLoading: [isLoading, setIsLoading],
  }
}

export default CategoriesAPI
