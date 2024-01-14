import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const state = useGlobalContext()

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/login', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = '/'
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <Wrapper className="page-100">
      <form onSubmit={loginSubmit}>
        <div>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password..."
            value={user.password}
            onChange={onChangeInput}
          />
          <div className="btn_row">
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default Login

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  form div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  form {
    padding: 2rem;
    border: 1.5px solid var(--c-primary);
    border-radius: 10px;
    width: 100%;
    max-width: 28.125rem;
    margin: 2rem;

    input {
      padding: 1rem;
      outline: none;
    }

    .btn_row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        padding: 0.75rem 1.5rem;
        background-color: var(--c-primary);
        color: white;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
        transition: var(--transition);
      }
      button:hover {
        background-color: var(--c-black);
      }
    }
  }
`
