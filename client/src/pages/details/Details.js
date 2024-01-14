import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGlobalContext } from '../../Context'
import styled from 'styled-components'

const Details = () => {
  const params = useParams()
  const state = useGlobalContext()
  const [products] = state.productsAPI.products
  const [detailsProduct, setDetailsProduct] = useState([])
  const addCart = state.userAPI.addCart

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailsProduct(product)
        }
      })
    }
  }, [params, products])

  if (detailsProduct.length === 0) return null

  return (
    <Wrapper>
      <div className="detail">
        <img src={detailsProduct.images.url} alt="" />

        <div className="box-detail">
          <div className="row">
            <h2>{detailsProduct.title}</h2>
          </div>

          <span>${detailsProduct.price}</span>
          <p>{detailsProduct.description}</p>
          <p id="desc">{detailsProduct.content}</p>
          <Link to="#" className="cart" onClick={() => addCart(detailsProduct)}>
            Buy Now
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

export default Details

const Wrapper = styled.main`
  .detail {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 3.125rem;
    font-size: 1.2rem;
  }

  .detail img {
    max-width: 25rem;
    margin: 1.25rem;
    height: 22.125rem;
  }

  .box-detail {
    max-width: 31.25rem;
    width: 100%;
    margin: 0.3125rem 1.25rem;
  }

  .box-detail h2 {
    text-transform: uppercase;
    color: var(--c-black);
    font-weight: 400;
  }

  .box-detail span {
    color: var(--c-primary);
    font-weight: 700;
  }

  .box-detail p {
    line-height: 1.5;
    margin: 0.625rem 0;
    opacity: 0.8;
  }

  #desc {
    margin-bottom: 1.5rem;
  }

  .box-detail .cart {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: var(--c-primary);
    color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: var(--transition);
  }

  .box-detail .cart:hover {
    background-color: var(--c-black);
  }
`
