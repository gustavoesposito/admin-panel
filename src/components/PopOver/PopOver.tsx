import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Popover } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Ícone para estado fechado
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Ícone para estado aberto

type PopoverType = {
  children?: React.ReactNode;
  title: string;
  color?: string;
  Icon?: React.ElementType;
  popoverWidth?: string;
  onClick?: () => void;
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
  '& .MuiButton-endIcon': {
    color: color,
  },
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
  },
}));

const PopoverSortOptions: React.FC<PopoverType> = ({
  children,
  title,
  color = '#9C27B0',
  Icon = ExpandMoreIcon,
  popoverWidth = '220px',
  onClick
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
      setIsExpanded(!isExpanded);
    } else {
      setAnchorEl(event.currentTarget);
      setIsExpanded(!isExpanded);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsExpanded(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-sort-options' : undefined;

  return (
    <div>
      <CustomButton
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        endIcon={isExpanded ? <ExpandLessIcon /> : <Icon />}
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
