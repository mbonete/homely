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

        <NavWrapper>
          <LogoAnchor to='/' alt='brand logo anchor'>
            Homely
          </LogoAnchor>
          <NavLinks>
            <LinkButton to='/ads' style={{backgroundColor: 'transparent', color: 'white', padding: '0'}}>All ads</LinkButton>
            {isLoggedIn && <LinkButton style={{backgroundColor: 'transparent', color: 'white', padding: '0'}} to={`/users/${currentUser.id}/ads`}>My ads</LinkButton>}
          </NavLinks>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
`;

const LogoAnchor = styled(Link)`
  font-family: 'Aleo', serif;
  display: flex;
  text-decoration: none;
  background-color: transparent;
  font-size: 2.5rem;
  color: white;
  border: transparent;
  cursor: pointer;
  align-items: center;
  padding: 0;
`;


const NavWrapper = styled.nav`
  display: flex;
  gap: 72px;
  align-items: baseline;
  justify-content: flex-start;
  width: 50%;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: baseline;
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
