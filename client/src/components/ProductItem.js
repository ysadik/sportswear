import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa'

const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  return (
    <Wrapper>
      {isAdmin ? (
        <div className="container">
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => handleCheck(product._id)}
          />
          <img src={product.images.url} alt="background-img" />
          <div className="links">
            <Link to={`/edit_product/${product._id}`} className="adminLink">
              <FaPencilAlt />
            </Link>
            <Link
              to="/"
              className="adminLink"
              onClick={() =>
                deleteProduct(product._id, product.images.public_id, true)
              }
            >
              <FaTrash />
            </Link>
          </div>
        </div>
      ) : (
        <div className="container">
          <img src={product.images.url} alt="background-img" />
          <Link to={`/products/${product._id}`} className="link">
            <FaSearch />
          </Link>
        </div>
      )}

      <footer>
        <h5>{product.title}</h5>
        <p>${product.price}</p>
      </footer>
    </Wrapper>
  )
}
export default ProductItem

const Wrapper = styled.article`
  .container {
    position: relative;
    border-radius: 10px;
    background-color: var(--c-black);

    input {
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 10px;
      z-index: 1;
    }
  }

  img {
    border-radius: 10px;
    transition: var(--transition);
  }

  .links {
    position: absolute;
    top: 40%;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 2rem;
  }

  .link {
    position: absolute;
    top: 43%;
    right: 42%;
  }

  .link,
  .adminLink {
    background-color: var(--c-primary);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--c-white);
    cursor: pointer;
    opacity: 0;
    transition: var(--transition);
    font-size: 1.25rem;
  }

  .container:hover img {
    opacity: 0.5;
  }

  .container:hover .link,
  .container:hover .adminLink {
    opacity: 1;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: start;

    p {
      color: var(--c-primary);
    }
    h5 {
      text-transform: capitalize;
      font-size: 1rem;
      color: var(--c-black);
    }
  }
`
