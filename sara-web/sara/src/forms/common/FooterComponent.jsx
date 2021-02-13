import { Box, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

class FooterComponent extends React.Component {
    render = () => {
        return (
            <Box mt={8}>
                <Copyright />
            </Box>
        );
    }
}
function Copyright() {
    return (
        <>
            <Box mx="auto" pt={3}><Divider />
                <Typography variant="body2" color="textSecondary" align="center">

                    Sara Project{' '} {' © '}
                    {new Date().getFullYear()}
                </Typography>
            </Box>
        </>
    );
}
export default FooterComponent;