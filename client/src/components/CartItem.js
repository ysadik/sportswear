import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import { FaPlus, FaMinus } from 'react-icons/fa'

const CartItem = ({ product, increment, decrement, removeProduct }) => {
  return (
    <Wrapper>
      <div className="title">
        <img src={product.images.url} alt={product.title} />
        <div>
          <h5 className="name">{product.title}</h5>
        </div>
      </div>

      <h5 className="price">{product.price}</h5>

      <div className="amount-btns">
        <button className="amount-btn" onClick={() => decrement(product._id)}>
          <FaMinus />
        </button>
        <h2 className="amount">{product.quantity}</h2>
        <button className="amount-btn" onClick={() => increment(product._id)}>
          <FaPlus />
        </button>
      </div>

      <h5 className="subtotal">
        {(product.price * product.quantity).toFixed(2)}
      </h5>

      <button
        type="button"
        className="remove-btn"
        onClick={() => removeProduct(product._id)}
      >
        <FaTrash />
      </button>
    </Wrapper>
  )
}
export default CartItem

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;

  .subtotal {
    display: none;
  }

  .price {
    display: none;
  }

  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }

  img {
    height: 100%;
    border-radius: 10px;
  }

  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .amount-btns {
    display: grid;
    width: 140px;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    h2 {
      margin-bottom: 0;
    }
    button {
      background: transparent;
      border-color: transparent;
      cursor: pointer;
      padding: 1rem 0;
      width: 2rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h2 {
      margin-bottom: 0;
    }
  }

  .remove-btn {
    color: var(--c-white);
    border: transparent;
    background: hsl(360, 67%, 44%);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 0.75rem;
    cursor: pointer;
  }

  @media (min-width: 776px) {
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;

    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--c-gray);
      font-weight: 400;
      font-size: 1rem;
    }

    .price {
      display: block;
      font-size: 1rem;
      color: var(--c-primary);
      font-weight: 400;
    }

    .name {
      font-size: 0.85rem;
    }

    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }

    img {
      height: 100%;
    }

    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
  }
`
