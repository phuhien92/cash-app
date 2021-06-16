import React from 'react';
import NavDrawer from './NavDrawer';
import { makeStyles, Container, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { drawerMachine } from "../machines/drawerMachine";
import { Interpreter } from 'xstate';
import { useMachine } from "@xstate/react";
import { AuthMachineContext, AuthMachineEvents } from '../machines/authMachine';

interface Props {
    children: React.ReactNode,
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>,
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
    const [drawerState, sendDrawer] = useMachine(drawerMachine);
    const aboveSmallBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
    const xsBreakpoint = useMediaQuery(theme.breakpoints.only('xs'));
    const desktopDrawerOpen = drawerState?.matches({desktop: 'open'});
    const mobileDrawerOpen  = drawerState?.matches({mobile: 'open'});
    const toggleMobileDrawer = () => {
        sendDrawer("TOGGLE_MOBILE")
    };
    const toggleDesktopDrawer = () => {
        sendDrawer("TOGGLE_DESKTOP")
    };
    const openDesktopDrawer = (payload: any) => sendDrawer("OPEN_DESKTOP", payload);
    const closeMobileDrawer = () => sendDrawer("TOGGLE_MOBILE");

    React.useEffect(() => {
        if (!desktopDrawerOpen && aboveSmallBreakpoint) {
            openDesktopDrawer({aboveSmallBreakpoint});
        }

    }, [aboveSmallBreakpoint, desktopDrawerOpen])
    return (
        <>
            <NavDrawer
                toggleDrawer={xsBreakpoint ? toggleMobileDrawer:toggleDesktopDrawer}
                drawerOpen={xsBreakpoint ? mobileDrawerOpen : desktopDrawerOpen}
                closeMobileDrawer={closeMobileDrawer}
                authService={authService}
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