import React from 'react';
import NavDrawer from './NavDrawer';
import { makeStyles, Container, Grid, useMediaQuery, useTheme } from "@material-ui/core";

interface Props {
    children: React.ReactNode,
    authService: any,
    notificationsService: any
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        minHeight: "77vh",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(4),
            padding: theme.spacing(4)
        }
    }
}))

const MainLayout: React.FC<Props> = ({
    children, 
    authService
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const aboveSmallBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
    const xsBreakpoint = useMediaQuery(theme.breakpoints.only('xs'));

    return (
        <>
            <NavDrawer 
                authService={authService} 
                drawerOpen={true}
            />
            <main className={classes.content}>
                <Container className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
                <footer>Footer here ...</footer>
            </main>
        </>
    )
}

export default MainLayout;