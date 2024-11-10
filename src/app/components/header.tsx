'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';

const Header = () => {
  const router = useRouter();

  const goMainMenu = () => {
    router.push('/');
  };

  const options = [
    { label: 'Account', path: '/' },
    { label: 'Bookings', path: '/' },
    { label: 'Recommendations', path: '/experiences' },
    { label: 'Extra Services', path: '/services' },
  ];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleClose(); // Close the menu after navigation
  };

  return (
    <header className="flex flex-row bg-white-100 pt-1 relative justify-between border-b border-gray-200 pb-2 w-[90%] mx-auto">
      <button onClick={goMainMenu} className="rounded-full z-10">
        <Image
          src="/logo.jpg"
          alt="Company Logo"
          width={60}
          height={100}
          style={{ margin: '10px' }}
          className="cursor-pointer rounded-full"
        />
      </button>

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => handleMenuItemClick(option.path)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </header>
  );
};

export default Header;
