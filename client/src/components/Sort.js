import styled from 'styled-components'
import { useGlobalContext } from '../Context'

const Sort = () => {
  const state = useGlobalContext()
  const [sort, setSort] = state.productsAPI.sort
  const [, setPage] = state.productsAPI.page
  const [, setIsCheck] = state.productsAPI.isCheck

  const handleSort = (e) => {
    setSort(e.target.value)
    setPage(1)
    setIsCheck(false)
  }

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="sort">sort by</label>
        <select
          id="sort"
          className="sort-input"
          value={sort}
          onChange={handleSort}
        >
          <option value="sort=-createdAt">Newest</option>
          <option value="">Oldest</option>
          <option value="sort=-price">Price: H to L</option>
          <option value="sort=price">Price: L to H</option>
        </select>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-bottom: 2rem;
  form {
    width: 25%;
    margin-left: auto;
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort
