import styled from 'styled-components'
import Filters from '../../components/Filters'
import Sort from '../../components/Sort'
import ProductList from '../../components/ProductList'

const Products = () => {
  return (
    <main className="section page-100">
      <Wrapper>
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList></ProductList>
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default Products
