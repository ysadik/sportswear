import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'
import { useGlobalContext } from '../Context'
import Loading from './Loading'

const Featured = () => {
  const state = useGlobalContext()
  const [products] = state.productsAPI.products
  const [isLoading] = state.productsAPI.isLoading

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>

      <div className="featured section-center">
        {isLoading && <Loading />}
        {products.slice(0, 3).map((product) => {
          return <ProductItem key={product._id} product={product} />
        })}
      </div>

      <Link className="btn" to="/products">
        ALL PRODUCTS
      </Link>
    </Wrapper>
  )
}
export default Featured

const Wrapper = styled.section`
  background-color: var(--c-gray-2);
  .title {
    text-align: center;
    color: var(--c-black);
    font-size: 1.5rem;
  }
  .title h2 {
    margin-bottom: 0.75rem;
  }
  .underline {
    width: 6rem;
    height: 0.25rem;
    background-color: var(--c-primary);
    margin-inline: auto;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: var(--c-primary);
    color: white;
    border-radius: 10px;
    cursor: pointer;
    display: block;
    width: 11rem;
    margin-inline: auto;
    text-align: center;
    transition: var(--transition);
  }
  .btn:hover {
    background-color: var(--c-black);
  }

  .featured {
    display: grid;
    gap: 2.5rem;
    grid-template-columns: repeat(auto-fit, minmax(21.25rem, 1fr));
    margin: 4rem auto;
  }
`
