import React from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import LinkButton from '../LinkButton/LinkButton';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import { Link } from 'react-router-dom';
import { useAPI } from '../../hooks/useAPI';

function Header() {
  const { isLoggedIn, currentUser } = useAPI();
  const { id, name } = currentUser || {};
  const userInitials = name?.charAt(0).toUpperCase() + name?.charAt(1).toUpperCase();
  return (
    <Wrapper>
      <MaxWidthWrapper>
        <NavWrapper>
          <LogoAnchor to='/' alt='brand logo anchor'>
            Homely
          </LogoAnchor>
          <LinkButton to='/ads' style={{backgroundColor: 'transparent', color: 'white', padding: '0'}}>All ads</LinkButton>
          {isLoggedIn && <LinkButton style={{backgroundColor: 'transparent', color: 'white', padding: '0'}} to={`/users/${currentUser.id}/ads`}>My ads</LinkButton>}
        </NavWrapper>

        <ButtonWrapper>
        {isLoggedIn ? (
          <>
            <LinkButton to='/adform' style={{backgroundColor: 'orange', borderRadius: '50px', marginRight: '16px'}}>
              <AddHomeOutlinedIcon style={{fontSize: '1.75rem', marginBottom: '4px', marginRight: '4px'}} />
              List your property
            </LinkButton>
            <Span>Hello {name}!</Span>
            <Link to={`/users/${id}`} style={{textDecoration: 'none'}}>
              <Avatar sx={{ bgcolor: 'white', color: 'navy'}}>{userInitials}</Avatar>
            </Link>
          </>
        ) : (
          <>
            <LinkButton to='/login'>Log in</LinkButton>
            <LinkButton to='/signup' style={{backgroundColor: 'orange'}}>Sign up</LinkButton>
          </>  
        )}
        </ButtonWrapper>
      </MaxWidthWrapper>
    </Wrapper>
  ) 
}

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  background-color: navy;
  position: sticky;
  top: 0;
  z-index: 2;
  isolation: isolate;
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
  font-size: 2rem;
  color: white;
  border: transparent;
  cursor: pointer;
  align-items: center;
  padding: 0;
`;


const NavWrapper = styled.nav`
  display: flex;
  gap: 16px;
  align-items: baseline;
  justify-content: flex-start;
  width: 50%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
`;
const Span = styled.span`
  color: white;
  font-size: 1.5rem;
`;

export default Header;
