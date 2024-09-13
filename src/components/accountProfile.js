import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

export const AccountProfile = () => {

    return (
        <Card className='bg-[#411313]'>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Avatar
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    />
                    <Typography
                        gutterBottom
                        color='white'
                        variant="h5"
                    >
                        Ranilson
                    </Typography>
                    <Typography
                        className='text-gray-300'
                        variant="body2"
                    >
                        {'Maceió - Alagoas'}
                    </Typography>
                </Box>
            </CardContent>
            <Divider sx={{ backgroundColor: '#411313' }} />
            <CardActions >
                <Button
                    fullWidth
                    className="text-[#FFD700]"
                    variant="text"
                    sx={{ textTransform: 'none' }}
                >
                    Carregar foto
                </Button>
            </CardActions>


        </Card>
    )
};