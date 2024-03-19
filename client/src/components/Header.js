import { useGlobalContext } from '../Context'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const Header = () => {
  const state = useGlobalContext()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  const [cart] = state.userAPI.cart

  // Ref for the sidebar menu
  const sidebarRef = useRef(null)

  useEffect(() => {
    const closeMenu = (event) => {
      // Close the menu if click occurs outside the menu
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false)
      }
    }

    // Add event listener for clicks on the document body
    document.body.addEventListener('click', closeMenu)

    return () => {
      // Cleanup event listener
      document.body.removeEventListener('click', closeMenu)
    }
  }, [])

  const toggleMenu = (event) => {
    // Prevent event propagation to the document body
    event.stopPropagation()
    setSidebarOpen(!sidebarOpen)
  }

  const logoutUser = async () => {
    setSidebarOpen(false)
    await axios.get('/user/logout')
    localStorage.removeItem('firstLogin')
    window.location.href = '/'
  }

  const adminRouter = () => {
    return (
      <>
        <li className="nav__link">
          <Link to="/create_product" onClick={() => setSidebarOpen(false)}>
            Create Product
          </Link>
        </li>
        <li className="nav__link" onClick={() => setSidebarOpen(false)}>
          <Link to="/category">Categories</Link>
        </li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li className="nav__link">
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    )
  }

  return (
    <HeaderContainer className="header section-center">
      <Link className="header__logo" to="/">
        <h1>{isAdmin ? 'Admin' : 'SPORTSWEAR'}</h1>
      </Link>

      <button className="nav__toggle" onClick={(event) => toggleMenu(event)}>
        <FaBars />
      </button>

      <ul ref={sidebarRef} className={`nav__links ${sidebarOpen && 'open'}`}>
        <li className="nav__link">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            {isAdmin ? 'Products' : 'Home'}
          </Link>
        </li>

        {!isAdmin && (
          <li className="nav__link">
            <Link to="/products" onClick={() => setSidebarOpen(false)}>
              Products
            </Link>
          </li>
        )}

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li className="nav__link">
            <Link to="/login" onClick={() => setSidebarOpen(false)}>
              Login | Register
            </Link>
          </li>
        )}

        {!isAdmin && (
          <Link
            to="/cart"
            onClick={() => setSidebarOpen(false)}
            className="cart cart-small"
          >
            <FaShoppingCart className="cart__icon" />
            <span className="cart__value">{cart.length}</span>
          </Link>
        )}
      </ul>

      {!isAdmin && (
        <Link to="/cart" className="cart cart-large">
          <span className="cart__value">{cart.length}</span>
          <FaShoppingCart className="cart__icon" />
        </Link>
      )}
    </HeaderContainer>
  )
}
export default Header

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;

  .nav__links {
    display: flex;
    gap: 3.125rem;
  }

  .header__logo {
    color: var(--c-primary);
  }

  .nav__link {
    font-size: 1rem;
    padding: 0.5rem;
    border-bottom: 2px solid transparent;
  }

  .nav__link:hover {
    border-bottom: 2px solid var(--c-primary);
  }

  .cart {
    font-size: 1.5rem;
    position: relative;
    color: var(--c-black);
  }

  .cart-large {
    .cart__value {
      position: absolute;
      background-color: var(--c-primary);
      color: var(--c-white);
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.7rem;
      font-size: 0.75rem;
      top: -0.625rem;
      right: -1rem;
    }
  }

  .cart-small {
    display: none;
  }

  .nav__toggle {
    display: none;
  }

  @media (max-width: 61.9375rem) {
    .nav__toggle {
      display: block;
      background: transparent;
      border: transparent;
      color: var(--c-primary);
      cursor: pointer;
      font-size: 2rem;
    }

    .nav__links {
      flex-direction: column;
      position: fixed;
      top: 5rem;
      right: -100%;
      height: 100%;
      width: 50%;
      background-color: var(--c-primary);
      padding: 2rem;
      transition: var(--transition);
      color: var(--c-white);
      z-index: 10;
      border-radius: 10px;
    }

    .open {
      right: 0;
    }

    .cart-small {
      display: flex;
      gap: 0.5rem;

      .cart__value {
        color: var(--c-white);
        font-size: 1rem;
      }
    }

    .cart-large {
      display: none;
    }
  }
`
