import React from 'react';
import Button from '@mui/material/Button';

function BaseButton({children, ...delegated}) {
  return <Button {...delegated}>{children}</Button>;
}

export default BaseButton;
