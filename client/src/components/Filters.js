import styled from 'styled-components'
import { useGlobalContext } from '../Context'

const Filters = () => {
  const state = useGlobalContext()
  const [categories] = state.categoriesAPI.categories
  const [category, setCategory] = state.productsAPI.category
  const [search, setSearch] = state.productsAPI.search
  const [, setPage] = state.productsAPI.page
  const [, setIsCheck] = state.productsAPI.isCheck

  const handleCategory = (e) => {
    setCategory(e.target.value)
    setSearch('')
    setPage(1)
    setIsCheck(false)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
    setPage(1)
    setIsCheck(false)
  }

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search */}
          <div>
            <input
              type="text"
              name="text"
              placeholder="Search"
              className="search-input"
              value={search}
              onChange={handleSearch}
            />
          </div>

          {/* category */}
          <div>
            <h5>category</h5>
            <select
              name="category"
              value={category}
              onChange={handleCategory}
              className="category-input"
            >
              <option value="">All Products</option>
              {categories.map((category) => (
                <option value={'category=' + category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  h5 {
    margin-bottom: 0.5rem;
  }

  .search-input {
    margin-bottom: 1.25rem;
    padding: 0.5rem;
    background: var(--c-gray-2);
    border-radius: 10px;
    border-color: transparent;
  }

  .category-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  @media (min-width: 48rem) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
