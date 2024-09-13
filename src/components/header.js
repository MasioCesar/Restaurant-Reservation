import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import Image from 'next/image';
import Link from "next/link";
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { useRef, useState } from 'react';
import { Avatar, Box, Popover } from '@mui/material';
import { Menu } from './menu';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { AccountPopover } from './accountPopover';


export const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);

    return (
        <Box className="bg-[#411313] relative flex items-center justify-between px-4">
            <Link href="/tables">
                <Image src="/logo.png" alt="ICBuffet" width={90} height={90} />
            </Link>
            <Box className="flex gap-4">
                <Link href="/tabs">
                    <ArticleTwoToneIcon
                        sx={{
                            color: '#FFD700',
                            fontSize: 50
                        }}
                    />
                </Link>
                <Box>
                    <MenuBookTwoToneIcon
                        aria-describedby={id}
                        onClick={handleClick}
                        sx={{
                            color: '#FFD700',
                            fontSize: 50,
                            cursor: 'pointer'
                        }}
                    />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Menu />
                    </Popover>
                </Box>
                <Box>
                    <Avatar
                        onClick={() => setOpenAccountPopover(true)}
                        ref={settingsRef}
                        sx={{
                            cursor: 'pointer',
                            height: 50,
                            width: 50,
                            
                        }}
                    >
                        <AccountCircleTwoToneIcon fontSize="large" />
                    </Avatar>
                    <AccountPopover
                        anchorEl={settingsRef.current}
                        open={openAccountPopover}
                        onClose={() => setOpenAccountPopover(false)}
                    />
                </Box>
            </Box>
        </Box>
    )

}