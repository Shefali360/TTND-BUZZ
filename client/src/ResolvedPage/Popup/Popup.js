import React from 'react';

const Popup=()=>{
    return(<div
        className={
          styles.popup +
          " " +
          (this.state.clicked ? styles.display : "null")+" "+
          (this.state.dropdownClicked?"null":styles.display)
        }
      >
        <span>
          <h5>
            Estimated Time
            <button className={styles.close} onClick={this.clicked}>
              <i className="fa fa-window-close"></i>
            </button>
          </h5>
        </span>
        <form>
          <div className={styles.formdata}>
          <input type="text" placeholder="Count" />
          <div className={styles.dropdown}>
            <select className={styles.select} name="department">
              <option value="hours">hours</option>
              <option value="days">days</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
            </select>
          </div>
          </div>
          <button type="submit" value="submit">
              Submit
            </button>
        </form>
      </div>)
}

export default Popup;