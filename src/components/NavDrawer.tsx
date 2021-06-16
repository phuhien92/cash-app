import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import clsx from 'clsx';
import { 
    Avatar, 
    Divider, 
    Drawer, 
    Grid, 
    makeStyles, 
    Typography, 
    useMediaQuery, 
    useTheme,
    Button
} from '@material-ui/core';
import { useService } from '@xstate/react';
import { AuthMachineContext, AuthMachineEvents, authService } from '../machines/authMachine';
import { Interpreter } from 'xstate';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    avatar: {
        marginRight: theme.spacing(1),
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        marginTop: 50,
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    userProfile: {
        padding: theme.spacing(2)
    },
    userProfileHidden: {
        display: "none"
    }
}))

interface Props {
    toggleDrawer: () => void;
    closeMobileDrawer: () => void;
    drawerOpen: boolean;
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>
}

const NavDrawer: React.FC<Props> = ({
    toggleDrawer,
    closeMobileDrawer,
    drawerOpen,
    authService
}) => {
    const classes = useStyles();
    const theme   = useTheme();
    const [authState, sendAuth] = useService(authService);
    const currentUser = authState?.context?.user;
    const signOut = () => sendAuth("LOGOUT");
    const showTemporaryDrawer = useMediaQuery(theme.breakpoints.only("xs"))
    return (
    <Drawer
        open={drawerOpen}
        variant={showTemporaryDrawer ? "temporary":"persistent"}
        classes={{
            paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose)
        }}
    >
        <Grid
            container 
            direction="row"
            justify="space-between"
            alignItems="center"
            className={drawerOpen ? classes.userProfile : classes.userProfileHidden}
        >
            <Grid item>
                {currentUser && <Avatar
                    className={classes.avatar}
                    alt={`${currentUser.firstName} ${currentUser.lastName}`}
                    src={currentUser.avatar}
                />}
            </Grid>
            <Grid item>
                {currentUser && (
                    <>
                        <Typography
                            variant="subtitle1"
                            color="textPrimary"
                        >
                            {currentUser.firstName} {currentUser.lastName[0]}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="inherit"
                            gutterBottom
                        >
                            @{currentUser.username}
                        </Typography>
                    </>
                )}
            </Grid>
            <Grid item>
                <Button onClick={() => signOut()}>Logout</Button>
            </Grid>
        </Grid>
    </Drawer>
    )
};

export default NavDrawer;
