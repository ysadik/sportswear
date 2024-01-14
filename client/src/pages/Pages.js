import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useGlobalContext } from '../Context'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import Home from './home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Products from './products/Products'
import NotFound from './not_found/NotFound'
import Details from './details/Details'

const Pages = () => {
  const state = useGlobalContext()
  const [isAdmin] = state.userAPI.isAdmin
  const [isLogged] = state.userAPI.isLogged

  return (
    <Routes>
      <Route exact path="/" element={isAdmin ? <Products /> : <Home />} />
      <Route exact path="/products" element={<Products />} />
      <Route exact path="/products/:id" element={<Details />} />
      <Route
        exact
        path="/login"
        element={isLogged ? <NotFound /> : <Login />}
      />
      <Route
        exact
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="*" element={<NotFound />} />
      <Route
        exact
        path="/category"
        element={isAdmin ? <Categories /> : <NotFound />}
      />
      <Route
        exact
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />
      <Route
        exact
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />
    </Routes>
  )
}

export default Pages
