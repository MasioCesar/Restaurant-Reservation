import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import NextLink from 'next/link';

export const AccountPopover = ({ anchorEl, onClose, open, ...other }) => {

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: { width: '300px', bgcolor: '#411313', borderColor: '#FFD700', borderWidth: '1px',  },
        },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <NextLink href="/account" passHref>
          <Typography variant="overline" color='white'>
            Account
          </Typography>
        </NextLink>
        <Typography
          color="white"
          variant="body2"
        >
          Ranilson
        </Typography>
      </Box>
      <MenuList
        disablePadding
      >
        <Divider sx={{backgroundColor:'white'}} />
        <MenuItem sx={{color:'white'}}>
          Suas reservas
        </MenuItem>
        <MenuItem sx={{color:'white'}}>
          Comandas
        </MenuItem>
      </MenuList>
    </Popover>
  );
};