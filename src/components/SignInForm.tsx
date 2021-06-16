import { 
    Grid, 
    Typography, 
    useTheme,
    makeStyles,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { Theme } from '@material-ui/core/styles';
import { useService } from '@xstate/react';
import React from 'react';
import { Interpreter } from 'xstate';
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from '../machines/authMachine';
import { SignInPayload } from '../models';
import SvgLogo from './SvgLogo';
import { Formik, Form, Field, FieldProps } from 'formik';
import { string, object } from "yup";
import { Link } from "react-router-dom";
import styled from "styled-components";

const validationSchema = object({
    username: string().required("Username is required"),
    password: string().required("Password is required").min(4, "Password must contain at least 4 characters")
})
export interface Props {
    authService: Interpreter<AuthMachineContext, AuthMachineSchema, AuthMachineEvents>
}
const useStyles = makeStyles((theme: Theme) => ({
    paper: {
      width: "100%",
      minHeight: "100vh",
      height: "auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left top, right bottom",
      backgroundSize: "auto 300px",
      backgroundImage: "url(https://members.onepeloton.com/static/media/dotsLeft.cbd303b9..svg), url(https://members.onepeloton.com/static/media/dotsRight.a3cd8d0d..svg)",
      backgroundColor: "#FFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    header: {
        color: theme.palette.primary.light,
        textAlign: "center",
        fontWeight: 700
    },
    centerBox: {
        maxWidth: "380px",
        width: "100%"
    },
    logoSvg: {
        fill: theme.palette.primary.dark
    },
    logoBox: {
        display: "flex",
        marginTop: "20px",
        marginBottom: "50px",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            marginTop: "40px",
            marginBottom: "120px"
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: "40px",
            marginBottom: "120px"
        }
    },
    form: {
  
    },
    alertMessage: {
        marginBottom: theme.spacing(1)
    }
}));


const SignInForm: React.FC<Props> = ({authService}) => {
    const classes = useStyles();
    const theme   = useTheme();
    const [authState, sendAuth] = useService(authService);
    const initialValues: SignInPayload = {
        username: "",
        password: "",
        remember: undefined
    };
    const signInPending = (payload: SignInPayload) => sendAuth({type: "LOGIN", ...payload});

    return (
        <>
            <Grid item xs={12} className={classes.paper} component={"main"}>
                <Box className={classes.centerBox}>
                    <Link to="/signin" className={classes.logoBox}>
                        <SvgLogo className={classes.logoSvg}/>
                    </Link>
                    <Typography variant="h1" component="h3" className={classes.header}>Sign In</Typography>

                    {authState?.context?.message && (
                        <Alert severity="error" className={classes.alertMessage}>
                            {authState.context.message}
                        </Alert>
                    )}

                    <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (value, {setSubmitting}) => {
                                setSubmitting(true);
                                signInPending(value)
                            }}
                        >
                            {({isValid, isSubmitting}) => (
                                <Form className={classes.form}>
                                    <Field name="username">
                                        {({field, meta: {error, value, initialValue, touched}}: FieldProps) => (
                                            <TextField
                                                autoComplete="false"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                type="text"
                                                autoFocus
                                                error={(touched || value != initialValue) && Boolean(error)}
                                                helperText={touched || value != initialValue ? error:""}
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({field, meta: {error, value, initialValue, touched}}: FieldProps) => (
                                            <TextField
                                                autoComplete="false"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                label="Password"
                                                type="password"
                                                id="password"
                                                error={touched && value != initialValue && Boolean(error)}
                                                helperText={touched && value !== initialValue && touched ? error:""}
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <FormControlLabel
                                        control={
                                            <Field name={"remember"}>
                                                {({field}: FieldProps) => (
                                                    <Checkbox color="primary" {...field}/>
                                                )}
                                            </Field>
                                        }
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={!isValid || isSubmitting}
                                    >Sign In</Button>
                                </Form>
                            )}
                        </Formik>
                        <p className="mt-10 text-center">
                            New to the site?
                            &nbsp;<Link to="/signup" className="font-semibold">Sign up now</Link>
                        </p>
                </Box>
            </Grid>
        </>
    )
}

export default SignInForm;