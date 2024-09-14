import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from "next/navigation"

export const AccountPopover = ({ anchorEl, onClose, open, ...other }) => {
  const router = useRouter()
  
  const handleOrders = () => {
    router.push("/account?section=reservas");
  }

  const handleTabs = () => {
    router.push("/tabs");
  }

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
          sx: { width: '300px', bgcolor: '#411313', borderColor: '#FFD700', borderWidth: '1px', },
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
          <Typography variant="overline">
            Account
          </Typography>
        </NextLink>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Ranilson
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleOrders} className='py-4'>
          Suas reservas
        </MenuItem>
        <MenuItem onClick={handleTabs} className='py-4'>
          Comandas
        </MenuItem>
      </MenuList>
    </Popover>
  );
};