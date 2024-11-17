import { useContext } from 'react';
import { Button, Card, CardActions, CardContent, Divider, Box, Avatar, Typography } from '@mui/material';
import { GetContext } from '@/lib/getFirebase';  // Importando o contexto para usar o logout

export const AccountProfile = ({ userDetails }) => {
    const { logoutUser } = useContext(GetContext);  // Pegando a função de logout do contexto
    console.log("userDetails " + userDetails.userName )
    return (
        <Card>
            <CardContent>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Avatar sx={{ height: 64, mb: 2, width: 64 }} />
                    <Typography gutterBottom variant="h5">
                        {userDetails.userName}
                    </Typography>
                    <Typography color="neutral.400" variant="body2">
                        {'Maceió - Alagoas'}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button fullWidth color='primary' variant="text" component="label">
                    Carregar foto
                </Button>
            </CardActions>
            <CardActions>
                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={logoutUser} 
                >
                    Logoff
                </Button>
            </CardActions>
        </Card>
    );
};
