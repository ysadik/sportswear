import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../Context'
import axios from 'axios'
import Loading from '../../components/Loading'
import styled from 'styled-components'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet iste delectus in beatae assumenda sed aut doloremque, neque, a facere deserunt dolorem deleniti provident quidem dolorum ratione natus nulla? Labore?',
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet iste delectus in beatae assumenda sed aut doloremque, neque, a facere deserunt dolorem deleniti provident quidem dolorum ratione natus nulla? Labore?',
  category: '',
  _id: null,
}

const CreateProduct = () => {
  const state = useGlobalContext()
  const [product, setProduct] = useState(initialState)
  const [categories] = state.categoriesAPI.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const navigate = useNavigate()
  const param = useParams()
  const [products] = state.productsAPI.products
  const [onEdit, setOnEdit] = useState(false)
  const [callback, setCallback] = state.productsAPI.callback

  useEffect(() => {
    if (param.id) {
      setOnEdit(true)
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product)
          setImages(product.images)
        }
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
      setImages(false)
    }
  }, [param.id, products])

  const handleUpload = async (e) => {
    e.preventDefault()

    try {
      if (!isAdmin) return alert("You're not an Admin.")

      const file = e.target.files[0]

      if (!file) return alert("File doesn't exist.")

      if (file.size > 1024 * 1024) return alert('File is too large.')

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('Incorrect format.')

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)

      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      })

      setLoading(false)
      setImages(res.data)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin.")

      setLoading(true)

      await axios.post(
        '/api/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      )

      setLoading(false)
      setImages(false)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!isAdmin) return alert("You're not an admin.")

      if (!images) return alert('No image uploaded.')

      if (onEdit) {
        await axios.patch(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        )
      } else {
        await axios.post(
          '/api/products',
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        )
      }

      setCallback(!callback)
      navigate('/')
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const styleUpload = {
    display: images ? 'block' : 'none',
  }

  return (
    <Wrapper className="page-100">
      <div className="create_product">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ''} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>

          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              rows="7"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label className="categ" htmlFor="categories">
              Categories
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">Please select a category</option>
              {categories.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">{onEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </Wrapper>
  )
}

export default CreateProduct

const Wrapper = styled.main`
  .create_product {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  .upload {
    max-width: 28.125rem;
    height: 22.25rem;
    width: 100%;
    border: 1px solid #ddd;
    padding: 15px;
    margin: 1.25rem;
    position: relative;
  }
  #file_up {
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
  }
  #file_up::before {
    content: '+';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: white;
    color: var(--c-primary);
    font-size: 17rem;
    text-align: center;
    cursor: pointer;
    margin: auto;
  }
  #file_img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: white;
  }
  #file_img img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  #file_img span {
    position: absolute;
    top: -13px;
    right: -13px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 50%;
    padding: 6px 10px;
    cursor: pointer;
    font-weight: 900;
    color: crimson;
  }

  .create_product form {
    max-width: 31.25rem;
    min-width: 18.125rem;
    width: 100%;
    margin: 15px 30px;
  }
  .create_product form .row {
    width: 100%;
    margin: 15px 0;
  }
  .create_product form input,
  textarea {
    width: 100%;
    min-height: 2.5rem;
    padding: 0 5px;
  }
  .create_product form button {
    width: 12.5rem;
    height: 2.5rem;
    background-color: var(--c-primary);
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    transition: var(--transition);
    border-radius: 5px;
  }
  .create_product form button:hover {
    background-color: var(--c-black);
  }
  label {
    display: inline-block;
    margin-bottom: 5px;
  }
  .categ {
    margin: 0 5px 0 0;
  }
`
