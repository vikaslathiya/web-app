
import './App.css';
import { Fragment } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
// import DashboardPage from "./components/pages/DashboardPage";
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';



function App() {
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);


  return (
    <Fragment>
      <Switch>

        {isLogin && <Route path="/home-page">
          <HomePage />
        </Route>}

        {!isLogin && <Route exact path="/auth">
          <LoginPage />
        </Route>}

        <Route path='*'>
          {isLogin ? <Redirect to="/home-page" /> : <Redirect to="/auth" />}
        </Route>

      </Switch>
    </Fragment>
  );
}

export default App;
