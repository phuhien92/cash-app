import React from 'react';
import PrivateRoutesContainer from './PrivateRoutesContainer';
import { makeStyles, CssBaseline, Theme } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useService } from '@xstate/react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import useAuthState from '../states/authState';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const { authState } = useAuthState();
  const isLoggedIn = authState.isAuthorized;

  return (
    <div className={classes.root}>
      <CssBaseline/>
      {isLoggedIn && (
        <PrivateRoutesContainer
          isLoggedIn={isLoggedIn}
          authService={useAuthState}
        />
      )}
      {!isLoggedIn && (
        <Switch>
          <Route exact path="/signup">
            <SignUpForm authService={useAuthState}/>
          </Route>
          <Route exact path="/signin">
            <SignInForm authService={useAuthState}/>
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
