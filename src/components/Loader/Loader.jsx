import { FaSpinner } from "react-icons/fa";
import styled, { keyframes } from 'styled-components';

export default function Loader() {
  
  return(
    <Wrapper>
      <IconWrapper>
        <FaSpinner style={{height: '100px', width: '100px', color: 'navy'}}/>
      </IconWrapper>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 39%, 0.33);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const IconWrapper = styled.div`
  animation: ${rotate} 1s steps(8) infinite;
`;