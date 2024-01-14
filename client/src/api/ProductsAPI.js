import { useState, useEffect } from 'react'
import axios from 'axios'

const ProductsAPI = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('sort=-price')
  const [isLoading, setIsLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const [result, setResult] = useState(0)
  const [isCheck, setIsCheck] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      const res = await axios.get(
        `/api/products?limit=9&page=${page}&${category}&${sort}&title[regex]=${search}`
      )
      const total = await axios.get('/api/all')
      setProducts(res.data.products)
      setResult(total.data.result)
      setIsLoading(false)
    }
    getProducts()
  }, [callback, category, page, search, sort])

  return {
    products: [products, setProducts],
    category: [category, setCategory],
    page: [page, setPage],
    search: [search, setSearch],
    sort: [sort, setSort],
    isLoading: [isLoading, setIsLoading],
    callback: [callback, setCallback],
    result: [result, setResult],
    isCheck: [isCheck, setIsCheck],
  }
}
export default ProductsAPI
