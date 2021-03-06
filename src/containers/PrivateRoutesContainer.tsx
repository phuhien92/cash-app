import React, { useEffect } from "react";
import MainLayout from "../components/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import { Switch } from "react-router";

export interface Props {
    isLoggedIn: boolean;
    authService: any;
}

const PrivateRoutesContainer: React.FC<Props> = ({
    isLoggedIn,
    authService
}) => {

    return (
        <MainLayout authService={authService} notificationsService={{}}>
            <div>user on board</div>
            <Switch>
                <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/(public|contacts|personal)?"}>
                    <div>home page...</div>
                </PrivateRoute>
            </Switch>
        </MainLayout>
    )
}

export default PrivateRoutesContainer;