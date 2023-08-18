import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header id="navbar">
      <Link to="/" className="logo" style={{fontSize:"xxx-large"}}>TweetFleet</Link>
      <nav>
        {username && (
          <>
            <Link className="login-btn" to="/create">Create new post</Link>
            <a className="register-btn" onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="buttons login-btn">Login</Link>
            <Link to="/register" className="buttons register-btn">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}