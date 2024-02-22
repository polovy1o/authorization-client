import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Main() {
    useEffect(() => {
        document.title = process.env.REACT_APP_BRAND_NAME
    }, [])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack width="100%" spacing={3} p={2} mt={2} maxWidth="600px">
                <Typography textAlign="center" variant="h4">Are you new user?</Typography>
                <Stack spacing={2}>
                    <Link to='/register'>
                        <Button sx={{ width: '100%' }} size='large' variant="contained">Yes, I am newbie! </Button>
                    </Link>
                    <Link to='/login'>
                        <Button sx={{ width: '100%' }} size='large' color='secondary' variant='contained'>I just want to log in </Button>
                    </Link>
                    <Link to='/reset'>
                        <Button sx={{ width: '100%' }} size='large' color='secondary' variant='contained'>I have forgotten the password </Button>
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Main