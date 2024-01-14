import styled from 'styled-components'
import { Link } from 'react-router-dom'
import img1 from '../assets/bcg.jpg'
import img2 from '../assets/bcg-2.jpg'

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Elevate your <br /> performance and style
        </h1>
        <p>
          Welcome to <span>SPORTSWEAR</span>, where passion meets performance!
          We are thrilled to present a curated selection of high-quality
          sportswear designed to empower athletes and fitness enthusiasts.
        </p>
        <Link to="/products" className="btn">
          SHOP NOW
        </Link>
      </article>
      <article className="img-container">
        <img src={img1} alt="bcg" className="img-1" />
        <img src={img2} alt="bcg-2" className="img-2" />
      </article>
    </Wrapper>
  )
}
export default Hero

const Wrapper = styled.section`
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8rem;

  .content {
    flex: 1;
  }

  .img-container {
    flex: 1;
    position: relative;
    margin-bottom: -20px;
  }

  .img-container::before {
    content: '';
    position: absolute;
    width: 10%;
    height: 80%;
    background: var(--c-primary);
    bottom: 0%;
    left: -8%;
    border-radius: 10px;
  }

  .img-1 {
    height: 31.25rem;
    position: relative;
    border-radius: 10px;
  }
  .img-2 {
    position: absolute;
    bottom: 0;
    width: 15.625rem;
    transform: translateX(-50%);
    border-radius: 10px;
  }

  .content h1 {
    font-size: 3rem;
    color: var(--c-black);
    margin-bottom: 2rem;
  }

  .content p {
    font-size: 1.25rem;
    line-height: 2;
    margin-bottom: 2rem;
  }

  span {
    color: var(--c-primary);
    font-weight: 700;
  }

  .content .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: var(--c-primary);
    color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: var(--transition);
  }
  .content .btn:hover {
    background-color: var(--c-black);
  }

  @media (max-width: 61.9375rem) {
    display: grid;
    .img-container {
      display: none;
    }

    p {
      line-height: 2;
      max-width: 40rem;
    }
  }
`
