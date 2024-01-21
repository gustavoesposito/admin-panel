import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Popover } from '@mui/material';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';

type PopoverType = {
  children?: React.ReactNode;
  title: string;
  color?: string; // Cor customizada para o botão
  Icon?: React.ElementType;
  popoverWidth?: string;
};

const CustomButton = styled(Button)(({ theme, color = '#9C27B0' }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid transparent',
  lineHeight: 1.5,
  backgroundColor: 'transparent',
  color: color,
  fontFamily: [
    '"Roboto"',
    '"Helvetica"',
    '"Arial"',
    'sans-serif'
  ].join(','),
  '& .MuiButton-endIcon': {
    color: color,
  },
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
  },
}));

const PopoverSortOptions = ({
  children,
  title,
  color = '#9C27B0',
  Icon = ChevronDownIcon,
  popoverWidth = '220px',
}: PopoverType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-sort-options' : undefined;

  return (
    <div>
      <CustomButton
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        endIcon={<Icon />}

      >
        {title}
      </CustomButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '.MuiPopover-paper': {
            minWidth: popoverWidth,
          },
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default PopoverSortOptions;
