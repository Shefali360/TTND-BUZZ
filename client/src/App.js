import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import BuzzPage from './BuzzPage/BuzzPage';
import AuthTokenDemo from './AuthToken/AuthTokenDemo';
import ComplaintPage from './ComplaintPage/ComplaintPage';
import ResolvedPage from './ResolvedPage/ResolvedPage';
import About from './components/About/About';
import TopDiv from './components/TopDiv/TopDiv';
import Sidebar from './components/Sidebar/SidebarItems/SidebarItems';
import styles from './AppStyle.module.css';
import Help from './components/Help/Help';

function App() {
  return (
<div>
{/* <Route path="/" exact component={Login}/>
<Route path="/authToken" exact component={AuthTokenDemo}/> */}
  <header>
  <TopDiv/>
  </header>
  <main className={styles.post}>
    <nav className={styles.leftDiv}>
      <Sidebar/>
    </nav>
    <div className={styles.rightDiv}>
   <Route path="/buzz" component={BuzzPage}/>
   <Route path="/complaint" component={ComplaintPage}/>
   <Route path="/resolved" component={ResolvedPage}/> 
   <Route path="/about" component={About}/> 
   <Route path="/help" component={Help}/> 
   </div>
   </main>
</div>
  );
}

export default App;
