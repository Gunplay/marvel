import { NavLink } from 'react-router-dom'
import { keyframes } from 'styled-components'
import styled from 'styled-components'
import ErrorMessage from '../errorMessage/ErrorMessage'
import homePicture from '../../resources/img/free-animated-icon-home-6844422.gif'
const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`

const NotFoundContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
`

const Title = styled.h1`
  color: red;
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: ${shake} 1.5s linear infinite;
`

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`

const Page404 = () => {
  return (
    <NotFoundContainer>
      <Title>Oops! Something went wrong...</Title>
      <ErrorMessage />
      <Text>The page you are looking for cannot be found.</Text>
      <NavLink to="/">
        <img
          style={{
            width: '60px',
            height: '60px',
          }}
          src={homePicture}
        ></img>
      </NavLink>
      <div>Go Back to Home</div>
      <NavLink to="/comics">Back to Comics</NavLink>
    </NotFoundContainer>
  )
}

export default Page404
