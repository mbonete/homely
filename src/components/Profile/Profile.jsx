import React from 'react';
import styled from 'styled-components';
import { useAPI } from '../../hooks/useAPI';
import LinkButton from '../LinkButton/LinkButton';
import MenuProfile from '../MenuProfile/MenuProfile';

function Profile() {
  const { logout } = useAPI();

  return (
    <Wrapper>
      <MenuWrapper>
        <MenuProfile />
        <LinkButton style={{fontSize: '1rem'}} onClick={logout}>Log out</LinkButton>
      </MenuWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 60%;
  justify-content: center;
  gap: 32px;
  padding: 32px;

}`;

const MenuWrapper = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}`;

export default Profile;
