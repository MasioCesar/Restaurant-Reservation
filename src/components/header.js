import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import Image from 'next/image';
import Link from "next/link";


export const Header = () => {
    return (
        <div className="bg-[#411313] relative flex items-center justify-between px-4">
            <Link href="/tables">
                <Image src="/logo.png" alt="ICBuffet" width={90} height={90} />
            </Link>
            <Link href="/tabs">
                <ArticleTwoToneIcon
                    sx={{
                        color: '#FFD700',
                        fontSize: 50
                    }}
                />
            </Link>
        </div>
    )

}