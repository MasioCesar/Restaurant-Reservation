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
        <Card>
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
                        variant="h5"
                    >
                        Ranilson
                    </Typography>
                    <Typography
                        color="neutral.400"
                        variant="body2"
                    >
                        {'Maceió - Alagoas'}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions >
                <Button
                    fullWidth
                    color='primary'
                    variant="text"
                    component="label"
                >
                    Carregar foto
                </Button>
            </CardActions>


        </Card>
    )
};