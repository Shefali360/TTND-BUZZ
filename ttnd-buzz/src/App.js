import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import buzzPage from './buzzPage/buzzPage';
import authTokenDemo from './authToken/authTokenDemo';
import complaintPage from './complaintPage/complaintPage';

function App() {
  return (
<div>
   <Route path="/" exact component={Login}/>
   <Route path="/authToken" component={authTokenDemo}/>
   <Route path="/buzz" component={buzzPage}/>
   <Route path="/complaint" component={complaintPage}/>
   {/* <Route path="/resolved" component={wholePage}/>  */}

</div>
  );
}

export default App;
