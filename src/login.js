import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useNavigate } from "react-router-dom";
import Style from "./styles/login.module.css";
import LockIcon from '@mui/icons-material/Lock';
import { TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://frontend-test-api.aircall.io/auth/login', {
        username,
        password
      });

      const token = response.data.access_token; // Extract the JWT token from the response
      console.log(JSON.stringify(response?.data))
      const accessToken = response.data.access_token;
    //   console.log(accessToken)
      // Store the token in local storage or state for future requests
      localStorage.setItem('token', token);
    //   console.log("getting token",localStorage.getItem('token'))

      // Redirect the user to the protected route or perform other actions
      // For example: history.push('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
    navigate('/cards', { replace: true });
  };


  return (
    <div className={Style.parent}>
    <div className={Style.topbar}>
        <div className={Style.logo}>
        <img src={require('./images/TT Logo.png')} alt="Logo" />
        </div>
    </div>
    <div className={Style.container}>
      {error && <p>{error}</p>}
      <div className={Style.loginbox}>
      <form onSubmit={handleLogin}>
        <div>
        <h2 className={Style.title}>Username</h2>
          <TextField className={Style.inputfield}
            
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
            InputProps={{
                startAdornment: <PersonIcon />,
              }}
              InputLabelProps={{
                className: Style.placeholder,
              }}
              placeholder="Enter your username"
          />
        </div>
        <div>
        <h2 className={Style.title}>Password</h2>
          <TextField className={Style.inputfield}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
            InputProps={{
                startAdornment:<LockIcon /> 
            }}
            InputLabelProps={{
                className: Style.placeholder,
              }}
            placeholder="Enter your password"
          />
        </div>
        <button className={Style.loginbutton} type="submit" >Login</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
