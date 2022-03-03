import './App.css';
import React, {Fragment} from 'react';
import LoginPage from './components/pages/LoginPage/LoginPage';
import HomePage from './components/pages/HomePage/HomePage';
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

                {!isLogin && <Route exact path="/auth">
                    <LoginPage/>
                </Route>}

                <Route path='*'>
                    {isLogin ? <Redirect to="/home-page"/> : <Redirect to="/auth"/>}
                </Route>

            </Switch>
        </Fragment>
    );
}

export default App;
