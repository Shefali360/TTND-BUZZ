import React from 'react';
import * as queryString from 'query-string';
import styles from './loginButton.module.css';

const stringifiedParams = queryString.stringify({
  client_id: '736637874877-l5h8150l95q5sm82ovg00kbqcivtsdlo.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:3000/buzz',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

const urlParams = queryString.parse(window.location.search);

if (urlParams.error) {
  console.log(`An error occurred: ${urlParams.error}`);
} else {
  console.log(`The code is: ${urlParams.code}`);
}
const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

const loginButton=()=>{
return (
    <div className={styles.btn}>
    <i className="fa fa-google" aria-hidden="true">
    <a className={styles.loginButton} href={googleLoginUrl}>
      Sign in with gmail 
    </a></i>
    </div>
  );
};

export default loginButton;