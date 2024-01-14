import { useGlobalContext } from '../../Context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CartItem from '../../components/CartItem'
import Loading from '../../components/Loading'

const Cart = () => {
  const state = useGlobalContext()
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)
  const [isLoading] = state.userAPI.isLoading

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0)
      setTotal(total.toFixed(2))
    }
    getTotal()
  }, [cart])

  const addToCart = async (cart) => {
    await axios.patch(
      '/user/addcart',
      { cart },
      { headers: { Authorization: token } }
    )
  }

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1)
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
      })
      setCart([...cart])
      addToCart(cart)
    }
  }

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear cart?')) {
      setCart([])
      addToCart([])
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (cart.length === 0) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper className="page">
      <section className="section section-center">
        <div className="content">
          <h5>item</h5>
          <h5>price</h5>
          <h5>quantity</h5>
          <h5>subtotal</h5>
          <span></span>
        </div>

        {cart.map((product) => (
          <CartItem
            key={product._id}
            product={product}
            increment={increment}
            decrement={decrement}
            removeProduct={removeProduct}
          />
        ))}

        <hr />

        <div className="link-container">
          <Link to="/products" className="link-btn">
            continue shopping
          </Link>
          <button
            type="button"
            className="link-btn clear-btn"
            onClick={clearCart}
          >
            clear cart
          </button>
        </div>

        <div className="total">
          <h3>Total: ${total}</h3>
          <Link to="/cart">Checkout</Link>
        </div>
      </section>
    </Wrapper>
  )
}
export default Cart

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }

  .content {
    display: none;
    h5 {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 0.75rem;
    }
    @media (min-width: 48.5rem) {
      display: grid;
      grid-template-columns: 316px 1fr 1fr 1fr auto;
      justify-items: center;
      column-gap: 1rem;
    }
  }

  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;

    .link-btn {
      border: none;
      text-transform: capitalize;
      padding: 0.25rem 0.5rem;
      background: var(--c-primary);
      color: var(--c-white);
      border-radius: 10px;
      font-weight: 400;
      cursor: pointer;
    }

    .clear-btn {
      background-color: var(--c-black);
    }
  }

  .total {
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-top: 2rem;
    gap: 0.5rem;
  }
`
