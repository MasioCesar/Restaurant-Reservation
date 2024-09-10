import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import Image from 'next/image';
import Link from "next/link";
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { useState } from 'react';
import { Popover } from '@mui/material';
import { Menu } from './menu';


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

    return (
        <div className="bg-[#411313] relative flex items-center justify-between px-4">
            <Link href="/tables">
                <Image src="/logo.png" alt="ICBuffet" width={90} height={90} />
            </Link>
            <div className="flex gap-4">
                <Link href="/tabs">
                    <ArticleTwoToneIcon
                        sx={{
                            color: '#FFD700',
                            fontSize: 50
                        }}
                    />
                </Link>
                <div>
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
                </div>

            </div>

        </div>
    )

}