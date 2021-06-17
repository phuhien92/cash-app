import React from 'react';
import { Link } from 'react-router-dom';

export interface Props {
    authService: any;
};

const SignUpForm: React.FC<Props> = ({authService}) => {

    return (
        <>
            <Link to="/signin">Sign in</Link>
        </>
    )
}

export default SignUpForm;