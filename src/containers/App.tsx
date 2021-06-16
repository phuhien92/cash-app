import React from 'react';
import PrivateRoutesContainer from './PrivateRoutesContainer';
import { makeStyles, CssBaseline, Theme } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useService } from '@xstate/react';
import { authService } from './../machines/authMachine';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [authState] = useService(authService);
  const isLoggedIn = 
    authState.matches("authorized") ||
    authState.matches("refreshing") ||
    authState.matches("updating");

  return (
    <div className={classes.root}>
      <CssBaseline/>
      {isLoggedIn && (
        <PrivateRoutesContainer
          isLoggedIn={isLoggedIn}
          authService={authService}
        />
      )}
      {authState.matches("unauthorized") && (
        <Switch>
          <Route exact path="/signup">
            <SignUpForm authService={authService}/>
          </Route>
          <Route exact path="/signin">
            <SignInForm authService={authService}/>
          </Route>
          <Route path="/*">
            <Redirect to={{pathname:"/signin"}}/>
          </Route>
        </Switch>
      )}
    </div>
  )
}

export default App;
