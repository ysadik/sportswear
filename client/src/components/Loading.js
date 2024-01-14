import styled from 'styled-components'

const Loading = () => {
  return (
    <Wrapper className="page-100">
      <div className="loading"></div>
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .loading {
    width: 6rem;
    height: 6rem;
    margin: 0 auto;
    margin-top: 10rem;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: var(--c-primary);
    animation: spinner 0.6s linear infinite;
  }
`
