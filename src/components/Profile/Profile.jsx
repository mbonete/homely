import React from 'react';
import styled from 'styled-components';
import { useAPI } from '../../hooks/useAPI';
import LinkButton from '../LinkButton/LinkButton';


function Profile() {
  const { logout, currentUser } = useAPI();

  return (
    <Wrapper>
      <p>Name: {currentUser.name}</p>
      <p>ID: {currentUser.id}</p>
      <p>Email: {currentUser.email}</p>
      <ButtonWrapper>
        <LinkButton style={{fontSize: '1rem', backgroundColor: 'orange'}} to={`/users/${currentUser.id}/ads`}>My ads</LinkButton>
        <LinkButton style={{fontSize: '1rem'}} onClick={logout}>Log out</LinkButton>
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  justify-content: flex-start;
  align-content: center;
  padding: 32px;
  background-color: lightgray;
  gap: 8px;

}`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;


export default Profile;
