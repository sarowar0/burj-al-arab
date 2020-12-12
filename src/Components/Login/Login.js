import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.Config';
import './Login.css'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  //For redirect children component
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };


  //Google sign in 
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email } = res.user;
        const signInUser = { name: displayName, email }
        setUser({
          isSignIn: true,
          name: displayName,
          email: email,
        })
        getToken()
        setLoggedInUser(signInUser)
      })
      .catch(function (error) {
        setUser({
          error: error.message
        })
      });
  }

  //Generate token in
  const getToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem('token', idToken)
      history.replace(from)
    }).catch(function (error) {
    });
  }

  //Facebook sign in
  const fbSignIn = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        setUser({
          isSignIn: true,
          name: displayName,
          photo: photoURL
        })
        setLoggedInUser(res.user)
        history.replace(from)
      }).catch(function (error) {
        setUser({
          error: error.message
        })
      });
  }

  //Check input validation
  const inputFieldHandle = (e) => {
    let isFieldValid = true;
    if (e.target.name == 'name') {
      isFieldValid = e.target.value
    }
    if (e.target.name == 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name == 'password') {
      isFieldValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value)
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const submitHandle = (e) => {

    //For create email & password base account
    if (isNewUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          firebase.auth().currentUser.updateProfile({
            displayName: user.name
          })
          const { displayName, email } = res.user;
          const signInUser = { name: displayName, email }
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          setLoggedInUser(signInUser);
          history.replace(from);
        })
        .catch(error => {
          var errorMessage = error.message;
          const newUserInfo = { ...user }
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }

    //For sign in existing email & password base account
    if (!isNewUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          setLoggedInUser(res.user);
          history.replace(from);
        })
        .catch(error => {
          var errorMessage = error.message;
          const newUserInfo = { ...user }
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    e.preventDefault()
  }


  return (
    <div className='login d-flex flex-column align-items-center justify-content-center'>

      <div className="form w-25">
        <button onClick={googleSignIn} className='btn btn-outline-primary my-3 w-75 mx-auto d-block'> <i className='fa fa-google'></i> Google Sign In</button>
        <button onClick={fbSignIn} className='btn btn-outline-primary my-3 w-75 mx-auto d-block'> <i className='fa fa-facebook'></i> Facebook Sign In</button>

        <h4 className='text-center text-uppercase'>Sing {isNewUser ? 'Up' : 'In'}</h4>

        <form onSubmit={submitHandle} className='w-100 form-group'>
          {isNewUser && <input onBlur={inputFieldHandle} className='form-control my-3' type="text" name='name' placeholder='Your name' required />}
          <input onBlur={inputFieldHandle} className='form-control my-3' type="text" name='email' placeholder='Email address' required />
          {isNewUser && <input onBlur={inputFieldHandle} className='form-control my-3' type="text" name='email' placeholder='Confirm email address' required />}
          <input onBlur={inputFieldHandle} className='form-control my-3' type="password" name='password' placeholder='Password' required />
          <input type="submit" value={isNewUser ? 'Sign Up' : 'Sign In'} className='form-control btn btn-primary' />
          <label onClick={() => setIsNewUser(!isNewUser)} className='text-primary btn btn-link'>{isNewUser ? 'Sign In' : 'Sign Up'}</label>
        </form>
        {
          user.success && <p className='text-success'>Account {isNewUser ? "create" : 'logged'} successfully</p>
        }
        <p className='text-danger'>{user.error}</p>
      </div>
    </div>
  );
};

export default Login;