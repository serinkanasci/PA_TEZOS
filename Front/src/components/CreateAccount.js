import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/login.css';

const CreateAccount = () => {
    return(
        <div>
          <body>
            <div class="login-page">
            <div class="form">
                <form class="register-form">
                <input type="text" placeholder="name"/>
                <input type="password" placeholder="password"/>
                <input type="text" placeholder="email address"/>
                <button type="submit">Create</button>
                </form>
            </div>
            </div>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
          </body>
        </div>

    )
}

export default CreateAccount;