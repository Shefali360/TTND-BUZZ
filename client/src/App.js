import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import BuzzPage from './components/BuzzPage/BuzzPage';
import ComplaintPage from './components/ComplaintPage/ComplaintPage';
import ResolvedPage from './components/ResolvedPage/ResolvedPage';
import About from './components/About/AboutInfo';
import Help from './components/Help/HelpPage';
import Login from './components/Login/Login';
import AuthToken from './containers/AuthToken/AuthToken';
import Home from './components/Home/Home';
import Aux from './hoc/wrap/wrap';
import PrivateRoute from './containers/PrivateRoute/PrivateRoute';
import AuthenticatedRoute from './containers/AuthenticatedRoute/AuthenticatedRoute';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/authToken" component={AuthToken}/>
       <Home>
          <Route component={({match})=>
          <Aux>
        <Switch>
        <PrivateRoute exact path="/buzz"><BuzzPage/></PrivateRoute>
        <PrivateRoute exact path="/complaint"><ComplaintPage/></PrivateRoute>
        <AuthenticatedRoute exact path="/resolved"><ResolvedPage/></AuthenticatedRoute>
        <Route exact path="/about" component={About}/>
        <Route exact path="/help" component={Help}/>
        <Route path="" component={NotFound}/>
        </Switch>
         </Aux>
          }/>
         </Home>
         
      </Switch>
    </Router>
   
  );
}

export default App;
