import styled from 'styled-components'

const Contact = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>Subscribe & get notified of discounts</h3>
        <div className="content">
          <p>
            Stay in the loop! Subscribe now and be the first to know about
            exclusive discounts and promotions.
          </p>
          <form className="contact-form">
            <input
              type="email"
              className="form-input"
              placeholder="Enter email..."
            />
            <button type="button" className="form-submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  )
}
export default Contact

const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    color: var(--c-black);
    font-size: 2rem;
  }
  .content {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    align-items: center;
  }

  .content p {
    line-height: 2;
  }
  .contact-form {
    width: 80vw;
    max-width: 31.25rem;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .form-submit {
    padding: 0.5rem 1rem;
    border: 1px solid black;
  }
  .form-input {
    border-right: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    outline: none;
  }
  .form-submit {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .form-submit {
    background-color: var(--c-primary);
    color: white;
    cursor: pointer;
    transition: var(--transition);
  }

  .form-submit:hover {
    background-color: var(--c-black);
  }

  @media (max-width: 61.9375rem) {
    .content {
      grid-template-columns: 1fr;
      gap: 1rem;
      place-items: center;
    }

    h3 {
      text-align: center;
    }
  }
`
