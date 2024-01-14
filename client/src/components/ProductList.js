import styled from 'styled-components'
import { useGlobalContext } from '../Context'
import ProductItem from './ProductItem'
import Loading from './Loading'
import { useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'

const ProductList = () => {
  const state = useGlobalContext()
  const [products, setProducts] = state.productsAPI.products
  const [isLoading] = state.productsAPI.isLoading
  const [isAdmin] = state.userAPI.isAdmin
  const [loading, setLoading] = useState(false)
  const [token] = state.token
  const [callback, setCallback] = state.productsAPI.callback
  const [page] = state.productsAPI.page
  const [isCheck, setIsCheck] = state.productsAPI.isCheck

  const deleteProduct = async (id, public_id, showAlert) => {
    if (
      showAlert &&
      window.confirm('Are you sure you want to delete this product?')
    ) {
      try {
        setLoading(true)

        const destroyImg = axios.post(
          '/api/destroy',
          { public_id },
          {
            headers: { Authorization: token },
          }
        )

        const deleteProduct = axios.delete(`/api/products/${id}`, {
          headers: { Authorization: token },
        })

        await Promise.all([destroyImg, deleteProduct])
        setCallback(!callback)
        setLoading(false)
      } catch (err) {
        alert(err.response.data.msg)
      }
    } else {
      // Skip the alert if showAlert is false
      try {
        setLoading(true)

        const destroyImg = axios.post(
          '/api/destroy',
          { public_id },
          {
            headers: { Authorization: token },
          }
        )

        const deleteProduct = axios.delete(`/api/products/${id}`, {
          headers: { Authorization: token },
        })

        await Promise.all([destroyImg, deleteProduct])
        setCallback(!callback)
        setLoading(false)
      } catch (err) {
        alert(err.response.data.msg)
      }
    }
  }

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked
        console.log(product.checked)
      }
    })

    setProducts([...products])
  }

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck
    })

    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const deleteAll = async () => {
    const checkedProducts = products.filter((product) => product.checked)

    if (checkedProducts.length === 0) {
      return
    }

    if (window.confirm('Are you sure you want to delete these products?')) {
      try {
        setLoading(true)

        const deletePromises = checkedProducts.map((product) =>
          deleteProduct(product._id, product.images.public_id, false)
        )

        await Promise.all(deletePromises)

        setCallback(!callback)
        setLoading(false)
      } catch (err) {
        alert(err.response.data.msg)
      }
    }

    setIsCheck(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Wrapper>
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          {(isCheck || products.some((product) => product.checked)) && (
            <button onClick={deleteAll}>Delete</button>
          )}
        </div>
      )}

      {isLoading && <Loading />}

      <div className="products-container">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          )
        })}
      </div>
      {products.length < 9 && page === 1 ? '' : <Pagination />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  .delete-all {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    button {
      background-color: var(--c-primary);
      color: white;
      border-radius: 5px;
      padding: 5px;
      transition: var(--transition);
      margin-left: 10px;
    }
    button:hover {
      background-color: var(--c-black);
    }
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default ProductList
