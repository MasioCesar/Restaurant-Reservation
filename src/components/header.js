import Image from 'next/image';
import { useState } from 'react';
import { Box, Popover } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { AccountPopover } from './accountPopover';
import { useUser } from '../app/context/UserContext';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const router = useRouter();
    const { user, setUser } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleHome = () => {
        setUser(user);
        router.push('/restaurants');
    };

    return (
        <Box className="bg-[#411313] relative flex items-center justify-between px-4 md:px-32 lg:px-24">
            <Box onClick={handleHome} sx={{ cursor: 'pointer' }}>
                <Image src="/logo.png" alt="ICBuffet" width={90} height={90} />
            </Box>
            <Box className="flex gap-4">
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                </Popover>
                <Box>
                    <AccountCircleTwoToneIcon 
                        onClick={(event) => setAnchorEl(event.currentTarget)} 
                        sx={{
                            cursor: 'pointer',
                            height: 50,
                            width: 50,
                            color: '#bc8c4e',
                        }} 
                        fontSize="large" 
                    />
                    <AccountPopover 
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    />
                </Box>
            </Box>
        </Box>
    );
};
