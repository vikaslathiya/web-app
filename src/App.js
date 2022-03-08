import './App.css';
import React, {Fragment} from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import {useSelector} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';


function App() {
    const isLogin = useSelector(state => state.isLoginReducer.isLogin);

    return (
        <Fragment>
            <Switch>
                {isLogin && <Route path="/home-page">
                    <HomePage/>
                </Route>}

                {!isLogin && <Route path="/auth">
                    <LoginPage/>
                </Route>}

                {!isLogin && <Route>
                    <Redirect to="/auth"/>
                </Route>}

            </Switch>
        </Fragment>
    );
}

export default App;
