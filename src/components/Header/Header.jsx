import React from 'react';
import styled from 'styled-components';
import { Home } from 'react-feather';
import Avatar from '@mui/material/Avatar';

import LinkButton from '../LinkButton/LinkButton';
import { Link } from 'react-router-dom';
import { useAPI } from '../../hooks/useAPI';

function Header() {
  const { isLoggedIn, currentUserId, currentUserName } = useAPI();
  return (
    <Wrapper>
      <MaxWidthWrapper>
        <LogoAnchor to='/' alt='brand logo anchor'>
          <Home size={32} color='white' style={{marginBottom: '5px', marginRight: '-5px'}}/>
          <BrandName>Homely</BrandName>
        </LogoAnchor>
        {isLoggedIn ? (
          <BtnWrapper>
            <Span>Hello {currentUserName}!</Span>
            <Link to={`/users/${currentUserId}`} style={{textDecoration: 'none'}}>
              <Avatar sx={{ bgcolor: 'white', color: 'navy'}}>MB</Avatar>
            </Link>
          </BtnWrapper>
        ) : (
          <BtnWrapper>
            <LinkButton to='/login'>Log in</LinkButton>
            <LinkButton to='/signup' style={{backgroundColor: 'orange'}}>Sign up</LinkButton>
          </BtnWrapper>
        )}
      </MaxWidthWrapper>
    </Wrapper>
  ) 
}

const Wrapper = styled.div`
  width: 100%;
  height: 10%;
  background-color: navy;
`;

const MaxWidthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1900px;
  padding: 8px 16px;
  margin: 0 auto;
`;

const LogoAnchor = styled(Link)`
  display: flex;
  text-decoration: none;
  background-color: transparent;
  border: transparent;
  cursor: pointer;
  align-items: center;
  gap: 16px;
  padding: 0;
`;

const BrandName = styled.h1`
  font-size: 2rem;
  color: white;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: baseline;
`;
const Span = styled.span`
  color: white;
  font-size: 1.5rem;
`;

export default Header;
