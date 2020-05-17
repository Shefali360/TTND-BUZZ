import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import wholePage from './wholePage/wholePage';

function App() {
  return (
<div>
   <Route path="/" exact component={Login}/>
   <Route path="/buzz" component={wholePage}/>
   <Route path="/complaint" component={wholePage}/>
   <Route path="/resolved" component={wholePage}/>

</div>
  );
}

export default App;
