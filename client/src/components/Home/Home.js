import React, { Component } from "react";
import styles from "../../AppStyle.module.css";
import TopDiv from '../../components/TopDiv/TopDiv';
import Sidebar from '../../components/Sidebar/SidebarItems/SidebarItems';

class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <TopDiv />
        </header>
        <main className={styles.post}>
          <nav className={styles.leftDiv}>
            <Sidebar />
          </nav>
          <div className={styles.rightDiv}>{this.props.children}</div>
        </main>
      </div>
    );
  }
}

export default Home;
