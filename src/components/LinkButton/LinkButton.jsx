import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function LinkButton({ to, children, ...delegated}) {
  const Tag = typeof to === 'string' ? Anchor : Button;

  return (
    <Tag to={to} {...delegated}>
      {children}
    </Tag>
  );
}

const style = `
  background-color: white;
  text-decoration: none;
  border: transparent;
  color: navy;
  padding: 8px 16px;
  font-size: 1.5rem;
  cursor: pointer;
  min-width: fit-content;
  width: 150px;
  text-align: center;
  border-radius: 2px;
`;

const Button = styled.button`${style}`;
const Anchor = styled(Link)`${style}`;


export default LinkButton;
