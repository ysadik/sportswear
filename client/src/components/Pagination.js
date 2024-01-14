import { useGlobalContext } from '../Context'
import styled from 'styled-components'

const Pagination = () => {
  const state = useGlobalContext()
  const [page, setPage] = state.productsAPI.page
  const [result] = state.productsAPI.result
  const totalPages = Math.ceil(result / 9)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <PaginationContainer>
      {totalPages > 1 && (
        <ul>
          {[...Array(totalPages).keys()].map((index) => (
            <li
              key={index + 1}
              className={page === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      )}
    </PaginationContainer>
  )
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  ul {
    list-style: none;
    display: flex;
    gap: 5px;

    li {
      cursor: pointer;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: var(--transition);

      &:hover {
        background-color: #eee;
      }

      &.active {
        background-color: var(--c-primary);
        color: #fff;
      }
    }
  }
`

export default Pagination
