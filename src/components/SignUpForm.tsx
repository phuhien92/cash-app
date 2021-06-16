import React from 'react';
import { Link } from 'react-router-dom';
import { Interpreter } from 'xstate';
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from '../machines/authMachine';

export interface Props {
    authService: Interpreter<AuthMachineContext,AuthMachineSchema, AuthMachineEvents>
};

const SignUpForm: React.FC<Props> = ({authService}) => {

    return (
        <>
            <Link to="/signin">Sign in</Link>
        </>
    )
}

export default SignUpForm;