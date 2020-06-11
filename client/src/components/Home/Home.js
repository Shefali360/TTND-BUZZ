import React, { Component } from "react";
import styles from "./Home.module.css";
import TopDiv from '../../components/TopDiv/TopDiv';
import Sidebar from '../../components/Sidebar/SidebarItems/SidebarItems';

class Home extends Component {
  state={
    navbarVisible:false
  }

  componentDidMount(){
    window.addEventListener("resize",this.navbar);
  }

  componentWillUnmount(){
    window.removeEventListener("resize",this.navbar);
  }
  navbar=()=>{
    if(window.innerWidth>1024&&this.state.navbarVisible)
    this.setState({navbarVisible:false});
  }
  toggleNavbar=()=>{
    this.setState({navbarVisible:!this.state.navbarVisible});
  }

  hideNavbar=()=>{
    if(this.state.navbarVisible===true){
      this.setState({navbarVisible:false})
    }
  }

  render() {
    return (
      <div className={styles.home}>
        <header>
          <TopDiv text={"Creating buzz around you has never been so easy.."}/>
        </header>
        <main className={styles.post}>
        <button className={styles.navigation} onClick={this.toggleNavbar}>Navigation</button>
        <nav>
        {(this.state.navbarVisible)?<div onClick={this.hideNavbar}className={styles.overlay}><Sidebar/></div>:null}
        </nav>
          <nav className={styles.leftDiv}>
            <Sidebar/>
          </nav>
          <div className={styles.rightDiv}>{this.props.children}</div>
        </main>
      </div>
    );
  }
}

export default Home;
