import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import BuzzPage from './BuzzPage/BuzzPage';
import ComplaintPage from './ComplaintPage/ComplaintPage';
import ResolvedPage from './ResolvedPage/ResolvedPage';
import About from './components/About/About';
import Help from './components/Help/Help';
import Login from './Login/Login';
import AuthToken from './AuthToken/AuthToken';
import Home from './Home/Home';
import Aux from './hoc/wrap/wrap';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AuthenticatedRoute from './AuthenticatedRoute/AuthenticatedRoute';
import NotFound from './NotFound/NotFound';

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
        <PrivateRoute exact path="/buzz"><BuzzPage/></PrivateRoute>
        <PrivateRoute exact path="/complaint"><ComplaintPage/></PrivateRoute>
        <PrivateRoute exact path="/resolved"><ResolvedPage/></PrivateRoute>
        <AuthenticatedRoute exact path="/resolved"><ResolvedPage/></AuthenticatedRoute>
        <Route path="/about" component={About}/>
        <Route path="/help" component={Help}/>
        
         </Aux>
          }/>
         </Home>
         
      </Switch>
    </Router>
   
  );
}

export default App;
