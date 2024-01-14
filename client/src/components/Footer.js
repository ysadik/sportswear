import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span>SPORTSWEAR</span>
      </h5>
      <h5>All rights reserved</h5>
    </Wrapper>
  )
}
export default Footer

const Wrapper = styled.footer`
  height: 5rem;
  background-color: var(--c-primary);
  color: var(--c-white);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;

  span {
    margin-left: 0.3125rem;
    font-weight: 700;
  }
  @media (max-width: 61.9375rem) {
    flex-direction: column;
  }
`
