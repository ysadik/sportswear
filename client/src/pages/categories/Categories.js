import { useState } from 'react'
import { useGlobalContext } from '../../Context'
import axios from 'axios'
import Loading from '../../components/Loading'
import styled from 'styled-components'

const Categories = () => {
  const state = useGlobalContext()
  const [token] = state.token
  const [categories] = state.categoriesAPI.categories
  const [callback, setCallback] = state.categoriesAPI.callback
  const [category, setCategory] = useState('')
  const [id, setId] = useState('')
  const [onEdit, setOnEdit] = useState(false)
  const [isLoading] = state.categoriesAPI.isLoading

  const createCategory = async (e) => {
    e.preventDefault()

    try {
      if (onEdit) {
        const res = await axios.patch(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        )
        alert(res.data.msg)
      } else {
        const res = await axios.post(
          '/api/category',
          { name: category },
          {
            headers: { Authorization: token },
          }
        )
        alert(res.data.msg)
      }

      setOnEdit(false)
      setCategory('')
      setCallback(!callback)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const editCategory = (id, name) => {
    setId(id)
    setCategory(name)
    setOnEdit(true)
  }

  const deleteCategory = async (name) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`api/category/${name}`, {
          headers: { Authorization: token },
        })
        setCallback(!callback)
      } catch (err) {
        alert(err.response.data.msg)
      }
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Wrapper className="page-100">
      <div className="categories">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Category</label>
          <br />
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>

        <div>
          {categories.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Edit
                </button>
                <button onClick={() => deleteCategory(category.name)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default Categories

const Wrapper = styled.main`
  .categories {
    max-width: 43.75rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 1.875rem auto;
  }
  .categories form {
    width: 18.125rem;
    margin-bottom: 1.25rem;
  }
  .categories label {
    display: block;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 0.625rem;
  }
  .categories input,
  button {
    height: 2.1875rem;
    border: none;
    outline: none;
    border-bottom: 1px solid #555;
  }
  .categories input {
    width: 13.125rem;
  }
  .categories button {
    width: 4.375rem;
    background-color: var(--c-primary);
    color: white;
    margin-left: 0.625rem;
    transition: var(--transition);
    border-radius: 5px;
  }
  .categories button:hover {
    background-color: var(--c-black);
  }
  .categories .row {
    min-width: 18.125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem;
    margin-bottom: 0.625rem;
    border: 1px solid #ccc;
  }
`
