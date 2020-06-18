import React, { Component } from 'react';
import * as queryString from 'query-string';
import styles from './LoginButton.module.css';

const stringifiedParams = queryString.stringify({
  client_id: '736637874877-l5h8150l95q5sm82ovg00kbqcivtsdlo.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:3000/authToken',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});


const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

class LoginButton extends Component{
  componentDidMount(){
    localStorage.clear();
  }
  render(){
return (
    <div className={styles.btn}>
    <i className="fa fa-google" aria-hidden="true">
    <a className={styles.loginButton} href={googleLoginUrl}>
      Sign in with gmail 
    </a></i>
    </div>
  );
};
}

export default LoginButton;