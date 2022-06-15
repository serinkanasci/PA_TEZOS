import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   
   export default function Login({ setToken }) {
     const [username, setUserName] = useState();
     const [password, setPassword] = useState();
   
     const handleSubmit = async e => {
       e.preventDefault();
       const token = await loginUser({
         username,
         password
       });
       setToken(token);
     }
   
     return(
        <div>
          <body>
            <div class="login-page">
            <div class="form">
                <form class="login-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <button type="submit">login</button>
                <p class="message">Not registered? <a href="http://localhost:3000/register">Create an account</a></p>
                </form>
            </div>
            </div>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script><script src="./script.js"></script>
          </body>
        </div>

    //    <div className="login-wrapper">
    //      <h1>Please Log In</h1>
    //      <form onSubmit={handleSubmit}>
    //        <label>
    //          <p>Username</p>
    //          <input type="text" onChange={e => setUserName(e.target.value)} />
    //        </label>
    //        <label>
    //          <p>Password</p>
    //          <input type="password" onChange={e => setPassword(e.target.value)} />
    //        </label>
    //        <div>
    //          <button type="submit">Submit</button>
    //        </div>
    //      </form>
    //    </div>
     )
   }
   
   Login.propTypes = {
     setToken: PropTypes.func.isRequired
   };