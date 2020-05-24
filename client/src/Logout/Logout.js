import React,{Component} from 'react';
import styles from './Logout.module.css';

class Logout extends Component{
    render(){
    return(<button className={styles.Logout} type="logout" name="logout">
    Logout <i className="fa fa-sign-out"></i>
  </button>);
}
}

export default Logout;